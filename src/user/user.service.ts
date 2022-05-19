import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.model";
import { Model, Schema as MongooseSchema } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./auth/jwt-payload.interface";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { AddAddressDto } from "./dto/add-address.dto";
import { AddCardDto } from "./dto/add-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { StripeService } from "../stripe/stripe.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
    private jwtService: JwtService,
    private stripeService: StripeService
  ) {}

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException("Invalid Credentials");
    }
  }

  private async signToken(userId: string) {
    const _id = userId;
    const payload: JwtPayload = { _id };
    const accessToken: string = this.jwtService.sign(payload);
    return accessToken;
  }

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<{ accessToken: string }> {
    let user = await this.userModel.findOne({ email: createUserDto.email });
    const stripeCustomer = await this.stripeService.createCustomer(
      createUserDto.firstName,
      createUserDto.email
    );
    if (user) throw new BadRequestException("User already exists!");
    else {
      try {
        const password = createUserDto.password;
        const hashedPassword = await bcrypt.hash(
          password,
          parseInt(process.env.SALT_ROUNDS)
        );
        user = await this.userModel.create({
          ...createUserDto,
          password: hashedPassword,
          stripeCustomerId: stripeCustomer.id,
        });
      } catch (err) {
        throw new BadRequestException("All fields are required");
      }
    }
    await user.save();
    const accessToken = await this.signToken(user.id);
    return { accessToken };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.userModel.findOne({
        email: loginUserDto.email,
      });
      if (!user) throw new UnauthorizedException("Invalid Credentials");
      else {
        await this.verifyPassword(loginUserDto.password, user.password);
        const accessToken = await this.signToken(user.id);
        return { accessToken };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findUser(user: User): Promise<User> {
    try {
      const userInfo = await this.userModel.findById(user._id);
      if (!userInfo) throw new NotFoundException("User not found!");
      else return userInfo;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException("User not found!");
      else return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(updateUserDto: UpdateUserDto, user: User): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(user._id, updateUserDto, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteUser(user: User): Promise<User> {
    try {
      return await this.userModel.findByIdAndDelete(user._id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addAddress(addAddressDto: AddAddressDto, user: User): Promise<any> {
    try {
      console.log("dto ", addAddressDto);
      return await this.userModel.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { addresses: addAddressDto } },
        { new: true }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteAddress(addressId: String, user: User): Promise<any> {
    try {
      console.log("delete", addressId, user);
      return await this.userModel
        .findByIdAndUpdate(
          user._id,
          { $pull: { addresses: { _id: addressId } } },
          { safe: true, upsert: true, new: true },
          (error, newUser) => {
            if (error) {
              console.log(error);
              throw new BadRequestException(error.message);
            } else {
              return newUser;
            }
          }
        )
        .clone();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateAddress(
    updateAddressDto: AddAddressDto,
    user: User,
    addressId: String
  ): Promise<any> {
    try {
      return await this.userModel.findOneAndUpdate(
        {
          _id: user._id,
          "addresses.id": addressId,
        },
        {
          $set: {
            "addresses.0.fullName": updateAddressDto.fullName,
            "addresses.0.companyName": updateAddressDto.companyName,
            "addresses.0.addressLine1": updateAddressDto.addressLine1,
            "addresses.0.addressLine2": updateAddressDto.addressLine2,
            "addresses.0.district": updateAddressDto.district,
            "addresses.0.cityCountry": updateAddressDto.cityCountry,
            "addresses.0.contactNumber": updateAddressDto.contactNumber,
          },
        },
        { new: true }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllAddresses(user: User): Promise<any> {
    try {
      const addresses = await this.userModel
        .findById(user._id)
        .select("addresses");
      if (!addresses) throw new NotFoundException("User not found!");
      else return addresses;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async setCardPrimary(
    user: User,
    previousId: String,
    newId: String
  ): Promise<any> {
    try {
      await this.userModel.findOneAndUpdate(
        { _id: user._id, "cards._id": previousId },
        {
          $set: {
            "cards.$.primary": false,
          },
        },
        { safe: true, upsert: true, new: true },
        (error, newUser) => {
          if (error) {
            throw new BadRequestException(error.message);
          } else {
            return newUser;
          }
        }
      );

      return await this.userModel.findOneAndUpdate(
        { _id: user._id, "cards._id": newId },
        {
          $set: {
            "cards.$.primary": true,
          },
        },
        { safe: true, upsert: true, new: true },
        (error, newUser) => {
          if (error) {
            throw new BadRequestException(error.message);
          } else {
            return newUser;
          }
        }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async setAddressPrimary(
    user: User,
    previousId: String,
    newId: String
  ): Promise<any> {
    try {
      await this.userModel.findOneAndUpdate(
        { _id: user._id, "addresses._id": previousId },
        {
          $set: {
            "addresses.$.primary": false,
          },
        },
        { safe: true, upsert: true, new: true },
        (error, newUser) => {
          if (error) {
            throw new BadRequestException(error.message);
          } else {
            return newUser;
          }
        }
      );

      return await this.userModel.findOneAndUpdate(
        { _id: user._id, "addresses._id": newId },
        {
          $set: {
            "addresses.$.primary": true,
          },
        },
        { safe: true, upsert: true, new: true },
        (error, newUser) => {
          if (error) {
            throw new BadRequestException(error.message);
          } else {
            return newUser;
          }
        }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addCard(addCardDto: AddCardDto, user: User): Promise<any> {
    try {
      return await this.userModel
        .findByIdAndUpdate(
          user._id,
          { $addToSet: { cards: addCardDto } },
          { safe: true, upsert: true, new: true },
          (error, newUser) => {
            if (error) {
              throw new BadRequestException(error.message);
            } else {
              return newUser;
            }
          }
        )
        .clone();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCard(cardId: String, user: User): Promise<any> {
    try {
      return await this.userModel
        .findByIdAndUpdate(
          user._id,
          { $pull: { cards: { _id: cardId } } },
          { safe: true, upsert: true, new: true },
          (error, newUser) => {
            if (error) {
              throw new BadRequestException(error.message);
            } else {
              return newUser;
            }
          }
        )
        .clone();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateCard(
    updateCardDto: UpdateCardDto,
    user: User,
    cardId: String
  ): Promise<any> {
    try {
      return await this.userModel.findOneAndUpdate(
        { _id: user._id, "cards._id": cardId },
        {
          $set: {
            "cards.$.cardNumber": updateCardDto.cardNumber,
            "cards.$.expiry": updateCardDto.expiry,
            "cards.$.cvv": updateCardDto.cvv,
          },
        },
        { safe: true, upsert: true, new: true },
        (error, newUser) => {
          if (error) {
            throw new BadRequestException(error.message);
          } else {
            return newUser;
          }
        }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllCards(user: User): Promise<any> {
    try {
      const addresses = await this.userModel.findById(user._id).select("cards");
      if (!addresses) throw new NotFoundException("User not found!");
      else return addresses;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
