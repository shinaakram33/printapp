import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cart, cartDocument } from './cart.model';
import { User } from '../user/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartAddProductDto } from './dto/cart-add-product.dto';
import { CartUpdateProductDto } from './dto/cart-update-product.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<cartDocument>) {}

  async findCart(user: User): Promise<any> {
    try {
      const userCart = await this.cartModel.findOne({ userId: user._id }).lean();
      return userCart;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createCart(user: User) {
    try {
      const cartFound = await this.findCart(user);
      if (cartFound) {
        return cartFound;
      } else {
        const cart = await this.cartModel.create({
          products: [],
          userId: user._id,
        });
        return cart;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async cartAddProduct(user: User, cartAddProductDto: CartAddProductDto) {
    try {
      const cart = await this.createCart(user);
      return await this.cartModel.findOneAndUpdate(
        { _id: cart._id },
        { $push: { products: cartAddProductDto }},
        { safe: true, upsert: true, new: true }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async cartRemoveProduct(user: User, productId: String) {
    try {
      const cart = await this.findCart(user);
      return await this.cartModel
        .findByIdAndUpdate(
          cart._id,
          { $pull: { products: { _id: productId } } },
          { safe: true, upsert: true },
          (error, newCart) => {
            if (error) throw new BadRequestException(error.message);
            return newCart;
          }
        )
        .clone();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async cartUpdateProduct(user: User, productId: string, cartUpdateProductDto: CartUpdateProductDto) {
    try {
      const cart = await this.findCart(user);
      const cartProductId = cart.products.findIndex((p) => p._id.toString() === productId);

      if (cartProductId === -1) throw new HttpException(`productId: '${productId}' not found`, HttpStatus.NOT_FOUND);

      cart.products[cartProductId] = { ...cart.products[cartProductId], ...cartUpdateProductDto };
      return await this.cartModel.updateOne({ _id: cart._id }, { $set: { products: cart.products } }, { multi: true });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async emptyCart(user: User) {
    try {
      const cart = await this.findCart(user);
      if (!cart) throw new BadRequestException('This user has no Cart');

      return await this.cartModel.updateOne({ _id: cart._id }, { $set: { products: [] } }, { multi: true });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
