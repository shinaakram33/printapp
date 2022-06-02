import { Body, Controller, Delete, Get, Patch, Post, Param, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/user/auth/get-user.decorator';
import { User } from '../user/user.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CartAddProductDto } from './dto/cart-add-product.dto';
import { CartUpdateProductDto } from './dto/cart-update-product.dto';

@ApiTags('Cart Controller')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async findCart(@GetUser() user: User): Promise<any> {
    return await this.cartService.createCart(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/empty')
  async emptyCart(@GetUser() user: User): Promise<any> {
    return await this.cartService.emptyCart(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/product/add')
  async addItemToCart(@Body() cartAddProductDto: CartAddProductDto, @GetUser() user: User): Promise<any> {
    return await this.cartService.cartAddProduct(user, cartAddProductDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/product/update/:productId')
  async updateItemFromCart(
    @GetUser() user: User,
    @Param('productId') productId: string,
    @Body() cartUpdateProductDto: CartUpdateProductDto,
  ): Promise<any> {
    return await this.cartService.cartUpdateProduct(user, productId, cartUpdateProductDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/product/delete/:productId')
  async removeItemFromCart(@GetUser() user: User, @Param('productId') productId: string): Promise<any> {
    return await this.cartService.cartRemoveProduct(user, productId);
  }
}
