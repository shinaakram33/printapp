import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetUser } from "./auth/get-user.decorator";
import { AddAddressDto } from "./dto/add-address.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("User Controller")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/signup")
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.createUser(createUserDto);
  }

  @Post("/login")
  async signin(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.userService.login(loginUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/find")
  async findUser(@GetUser() user: User) {
    return await this.userService.findUser(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch("/update")
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User
  ) {
    return await this.userService.updateUser(updateUserDto, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch("/address/add/")
  async addAddress(
    @Body() addAddressDto: AddAddressDto,
    @GetUser() user: User
  ) {
    return await this.userService.addAddress(addAddressDto, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch("/address/update/:addressId")
  async updateAddress(
    @Body() updateAddressDto: UpdateAddressDto,
    @GetUser() user: User,
    @Param("addressId") addressId: String
  ) {
    return await this.userService.updateAddress(
      updateAddressDto,
      user,
      addressId
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch("/address/delete/:addressId")
  async deleteAddress(
    @GetUser() user: User,
    @Param("addressId") addressId: String
  ) {
    return await this.userService.deleteAddress(addressId, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch("/address/getall/")
  async getAllAddresses(@GetUser() user: User) {
    return await this.userService.getAllAddresses(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete("/delete")
  async delete(@GetUser() user: User) {
    return await this.userService.deleteUser(user);
  }
}
