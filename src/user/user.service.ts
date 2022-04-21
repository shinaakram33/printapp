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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
    private jwtService: JwtService
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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    let user = await this.userModel.findOne({ email: createUserDto.email });
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
        });
      } catch (err) {
        throw new BadRequestException("All fields are required");
      }
    }
    await user.save();
    return await this.findUser(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.userModel.findOne({
        email: loginUserDto.email,
      });
      if (!user) throw new UnauthorizedException("Invalid Credentials");
      else {
        await this.verifyPassword(loginUserDto.password, user.password);
        const _id = user.id;
        const payload: JwtPayload = { _id };
        const accessToken: string = this.jwtService.sign(payload);
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
      return await this.userModel
        .findByIdAndUpdate(
          user._id,
          { $push: { addresses: addAddressDto } },
          { safe: true, upsert: true },
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
}
