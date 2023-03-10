import { Body, Controller, Delete, Get, Param, Patch, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUser } from './auth/get-user.decorator';
import { AddAddressDto } from './dto/add-address.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyPinDto } from './dto/verify-pin.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User Controller')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.createUser(createUserDto);
  }

  @Post('/login')
  async signin(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.userService.login(loginUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/find')
  async findUser(@GetUser() user: User) {
    return await this.userService.findUser(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/findall')
  async findAllUsers(@GetUser() user: User) {
    return await this.userService.findAll(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/find/name/:name')
  async findByName(@GetUser() user: User, @Param('name') name: string) {
    return await this.userService.searchByName(user, name);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/find/id/:userId')
  async findById(@GetUser() user: User, @Param('userId') userId: string) {
    return await this.userService.searchByName(user, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/find/status/:userId')
  async findByStatus(@GetUser() user: User, @Param('status') status: string) {
    return await this.userService.searchByName(user, status);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return await this.userService.updateUser(updateUserDto, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/updateBtAdmin/:userId')
  async updateUserByAdmin(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return await this.userService.updateUserByAdmin(updateUserDto, user, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete')
  async delete(@GetUser() user: User) {
    return await this.userService.deleteUser(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/address/add/')
  async addAddress(@Body() addAddressDto: AddAddressDto, @GetUser() user: User) {
    return await this.userService.addAddress(addAddressDto, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/address/update/:addressId')
  async updateAddress(@Body() updateAddressDto: UpdateAddressDto, @GetUser() user: User, @Param('addressId') addressId: string) {
    return await this.userService.updateAddress(updateAddressDto, user, addressId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/address/delete/:addressId')
  async deleteAddress(@GetUser() user: User, @Param('addressId') addressId: string) {
    return await this.userService.deleteAddress(addressId, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/address/getall/')
  async getAllAddresses(@GetUser() user: User) {
    return await this.userService.getAllAddresses(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/address/:addressId')
  async setAddressPrimary(@GetUser() user: User, @Param('addressId') addressId: string) {
    return await this.userService.setAddressPrimary(user, addressId);
  }

  @ApiBearerAuth()
  @Patch('/forgetpassword')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return await this.userService.forgetPassword(forgetPasswordDto);
  }

  @ApiBearerAuth()
  @Patch('/resetpassword')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.userService.resetPassword(resetPasswordDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/changepassword/')
  async changePassword(@GetUser() user: User, @Body() changePasswordDto: ChangePasswordDto) {
    return await this.userService.changePassword(user, changePasswordDto);
  }

  @ApiBearerAuth()
  @Post('/verifyotp/')
  async verifyOTP(@Body() verifyPinDto: VerifyPinDto) {
    return await this.userService.verifyOTP(verifyPinDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/admin/address/add/:userId')
  async addUserAddressByAdmin(@Body() addAddressDto: AddAddressDto, @Param('userId') userId: string, @GetUser() user: User) {
    if (user.role !== 'ADMIN') return new UnauthorizedException('User has no access');
    return await this.userService.addAddress(addAddressDto, { _id: userId as unknown as ObjectId } as User);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/admin/address/update/:userId/:addressId')
  async updateAddressByAdmin(@Body() updateAddressDto: UpdateAddressDto, @GetUser() user: User, @Param() params) {
    if (user.role !== 'ADMIN') return new UnauthorizedException('User has no access');
    
    const { addressId, userId } = params;
    return await this.userService.updateAddress(updateAddressDto, { _id: userId as unknown as ObjectId } as User, addressId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({name: 'userId'})
  @ApiParam({name: 'addressId'})
  @Patch('/admin/address/delete/:userId/:addressId')
  async deleteAddressByAdmin(@GetUser() user: User, @Param() params) {
    if (user.role !== 'ADMIN') return new UnauthorizedException('User has no access');

    const { addressId, userId } = params;
    return await this.userService.deleteAddress(addressId, { _id: userId as unknown as ObjectId } as User);
  }
}
