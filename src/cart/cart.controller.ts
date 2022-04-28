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
import { CartAddItemDto } from "./dto/cart-add-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";

@ApiTags("Cart Controller")
@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  async findCart(@GetUser() user: User): Promise<any> {
    return await this.cartService.createCart(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Patch("/item/add")
  async addItemToCart(
    @Body() cartAddItemDto: CartAddItemDto,
    @GetUser() user: User
  ): Promise<any> {
    return await this.cartService.cartAddItem(user, cartAddItemDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Patch("/item/delete/:itemId")
  async removeItemFromCart(
    @Param("itemId") itemId: string,
    @GetUser() user: User
  ): Promise<any> {
    return await this.cartService.cartRemoveItem(user, itemId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Delete("/item/update/:itemId")
  async updateItemFromCart(
    @Param("itemId") itemId: string,
    @GetUser() user: User,
    @Body() updateItemDto: UpdateItemDto
  ): Promise<any> {
    return await this.cartService.cartUpdateItem(user, itemId, updateItemDto);
  }
}
