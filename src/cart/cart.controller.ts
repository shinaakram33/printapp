import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "src/user/auth/get-user.decorator";
import { User } from "../user/user.model";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { CartAddItemDto } from "./dto/cart-add-item.dto";

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("/")
  async findCart(@GetUser() user: User): Promise<any> {
    return await this.cartService.findCart(user);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/item/add")
  async addItemToCart(
    @Body() cartAddItemDto: CartAddItemDto,
    @Body() createCartDto: CreateCartDto,
    @GetUser() user: User
  ): Promise<any> {
    return await this.cartService.cartAddItem(
      user,
      cartAddItemDto,
      createCartDto
    );
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/item/delete/:itemId")
  async removeItemFromCart(
    @Param("itemId") itemId: string,
    @GetUser() user: User
  ): Promise<any> {
    return await this.cartService.cartRemoveItem(user, itemId);
  }
}
