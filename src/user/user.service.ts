import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './user.model';

import { JwtPayload } from './auth/jwt-payload.interface';

import { Model, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyPinDto } from './dto/verify-pin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AddAddressDto } from './dto/add-address.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { StripeService } from '../stripe/stripe.service';

import { SendgridService } from '../sendgrid.module';


@Injectable()
export class UserService {
  private logger: LoggerService = new Logger();

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private stripeService: StripeService,
    private sendgridService: SendgridService
  ) {}

  private sendEmail(to: string, subject: string, text: string): Promise<void> {
    return this.sendgridService.sendMail({ to, subject, text });
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid Password');
    }
  }

  private async signToken(userId: string) {
    const _id = userId;
    const payload: JwtPayload = { _id };
    const accessToken: string = this.jwtService.sign(payload);
    return accessToken;
  }

  async createUser(createUserDto: CreateUserDto): Promise<{ accessToken: string, user: User }> {
    let user = await this.userModel.findOne({ email: createUserDto.email });
    const stripeCustomer = await this.stripeService.createCustomer(createUserDto.firstName, createUserDto.email);
    if (user) throw new BadRequestException('User already exists!');
    else {
      try {
        const password = createUserDto.password;
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        user = await this.userModel.create({
          ...createUserDto,
          password: hashedPassword,
          stripeCustomerId: stripeCustomer.id,
          date: new Date().toISOString()
        });
        await this.updateUser({ deviceId: createUserDto.deviceId }, user);
      } catch (err) {
        throw new BadRequestException('All fields are required');
      }
    }
    await user.save();
    user.password = null;
    const accessToken = await this.signToken(user.id);
    return { accessToken, user };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.userModel.findOne({
        email: loginUserDto.email,
      });
      if (!user) throw new UnauthorizedException('Invalid Credentials');
      else {
        await this.verifyPassword(loginUserDto.password, user.password);
        const accessToken = await this.signToken(user.id);
        await this.updateUser({ deviceId: loginUserDto.deviceId }, user);
        return { accessToken };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findUser(user: User): Promise<any> {
    try {
      const userInfo = await this.userModel.findById(user._id);
      if (!userInfo) throw new NotFoundException('User not found!');
      else return userInfo;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(user: User): Promise<any> {
    try {
      if (user.role == 'ADMIN') {
        const users = await this.userModel.find();
        if (!users) throw new NotFoundException('No User found!');
        else return users;
      } else {
        throw new UnauthorizedException('Unauthorized User');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchByName(user: User, name: string) {
    try {
      if (user.role == 'ADMIN') {
        const users = await this.userModel.find({ firstName: name });
        if (!users) throw new NotFoundException('No User found!');
        else return users;
      } else {
        throw new UnauthorizedException('Unauthorized User');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchById(user: User, userId: string) {
    try {
      if (user.role == 'ADMIN') {
        const users = await this.userModel.findById(userId);
        if (!users) throw new NotFoundException('No User found!');
        else return users;
      } else {
        throw new UnauthorizedException('Unauthorized User');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchByStatus(user: User, status: string) {
    try {
      if (user.role == 'ADMIN') {
        const users = await this.userModel.find({ status });
        if (!users) throw new NotFoundException('No User found!');
        else return users;
      } else {
        throw new UnauthorizedException('Unauthorized User');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) throw new NotFoundException('User not found!');
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

  async updateUserByAdmin(updateUserDto: UpdateUserDto, user: User, userId: string): Promise<User> {
    try {
      if (user.role == 'ADMIN') {
        const userExists = await this.userModel.findById(userId.toString());
        console.log(userExists);
        if (!userExists) {
          throw new NotFoundException(`User with id ${userId} does not exists`);
        }
        return await this.userModel.findByIdAndUpdate(user._id, updateUserDto, {
          new: true,
        });
      } else {
        throw new UnauthorizedException('Unauthorized User');
      }
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
      const dbUser = await this.userModel.findById(user._id).lean();
      if (!dbUser) throw new NotFoundException('User not found');

      if (dbUser.addresses.length)
        return await this.userModel.findOneAndUpdate(
          { _id: dbUser._id },
          { $addToSet: { addresses: { ...addAddressDto, primary: false } } },
          { new: true }
        );
      return await this.userModel.findOneAndUpdate(
        { _id: dbUser._id },
        { $addToSet: { addresses: { ...addAddressDto, primary: true } } },
        { new: true }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteAddress(addressId: string, user: User): Promise<any> {
    try {
      return await this.userModel
        .findByIdAndUpdate(
          user._id,
          { $pull: { addresses: { _id: addressId } } },
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

  async updateAddress(updateAddressDto: AddAddressDto, user: User, addressId: string): Promise<any> {
    try {
      return await this.userModel.findOneAndUpdate(
        {
          _id: user._id,
          'addresses._id': addressId,
        },
        {
          $set: {
            'addresses.$.fullName': updateAddressDto.fullName,
            'addresses.$.companyName': updateAddressDto.companyName,
            'addresses.$.addressLine1': updateAddressDto.addressLine1,
            'addresses.$.addressLine2': updateAddressDto.addressLine2,
            'addresses.$.district': updateAddressDto.district,
            'addresses.$.cityCountry': updateAddressDto.cityCountry,
            'addresses.$.contactNumber': updateAddressDto.contactNumber,
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
      const addresses = await this.userModel.findById(user._id).select('addresses');
      if (!addresses) throw new NotFoundException('User not found!');
      else return addresses;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async setAddressPrimary(user: User, newPrimaryAddressId: string): Promise<any> {
    try {
      const { addresses } = await this.userModel.findById(user._id).select('addresses').lean();
      return this.userModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { addresses: addresses.map((a) => ({ ...a, primary: a['_id'].toString() === newPrimaryAddressId })) } },
        { safe: true, upsert: true, new: true }
      );
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<any> {
    try {
      const { email } = forgetPasswordDto;
      const resetToken = Math.random().toString(36).substring(4);
      const message = `Your Verification Code is ${resetToken}.`;

      const user = await this.userModel.findOne({ email });

      if (!user) throw new NotFoundException('Email does not exist');

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 300000;

      await Promise.all([this.sendEmail(user.email, 'Reset Password', message), user.save()]);
      
      return 'OTP sent to the given email';
    } catch (error) {
      throw new InternalServerErrorException('Something Occurred. Try again in a few minutes')
    }
  }

  public async verifyOTP(verifyPinDto: VerifyPinDto) {
    try {
      const user = await this.userModel.findOne({
        resetPasswordToken: verifyPinDto.otp.toString(),
        resetPasswordExpires: { $gt: Date.now() },
      }).lean();

      if (!user) throw new NotFoundException('Invalid pin or pin expired!');

      delete user.password;
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const user = await this.userModel.findById(resetPasswordDto.userId);
      if (resetPasswordDto.password !== resetPasswordDto.confirmPassword)
        throw new UnauthorizedException('Password Does Not Match with Confirm Pasword');
      user.password = await bcrypt.hash(resetPasswordDto.password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return 'Password changed successfully!';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
    try {
      if (!user) throw new UnauthorizedException('Invalid Credentials');
      else {
        await this.verifyPassword(changePasswordDto.currentPassword, user.password);
        const password = changePasswordDto.newPassword;
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        return await this.userModel.findByIdAndUpdate(
          user._id,
          { password: hashedPassword },
          {
            new: true,
          }
        );
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
/*   public async createUserByAdmin(createUserDto: CreateUserDto) {
    const user = this.userModel.findOne({email: createUserDto.email})
    if (user) throw new BadRequestException('User already exists!');
    try {
      const stripeCustomer = await this.stripeService.createCustomer(createUserDto.firstName, createUserDto.email);
      const password = createUserDto.password;
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
      const newUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
        stripeCustomerId: stripeCustomer.id,
      });
      await this.updateUser({ deviceId: createUserDto.deviceId }, newUser);
      await newUser.save();
      return newUser;
    } catch (err) {
      throw new BadRequestException('All fields are required');
    }
  } */
}
