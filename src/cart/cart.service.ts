import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Cart, cartDocument } from "./cart.model";
import { User } from "../user/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";
import { CreateCartDto } from "./dto/create-cart.dto";
import { CartAddItemDto } from "./dto/cart-add-item.dto";

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<cartDocument>) {}

  async createCart(user: User, createCartDto: CreateCartDto) {
    try {
      const cartFound = this.findCart(user);
      if (cartFound) {
        return cartFound;
      } else {
        return await this.cartModel.create(createCartDto);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findCart(user: User): Promise<any> {
    try {
      return await this.cartModel.find({ userId: user._id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async cartAddItem(
    user: User,
    cartAddItemDto: CartAddItemDto,
    createCartDto: CreateCartDto
  ) {
    try {
      const cart = await this.createCart(user, createCartDto);
      return await this.cartModel
        .findByIdAndUpdate(
          cart._id,
          { $push: { products: cartAddItemDto } },
          { safe: true, upsert: true },
          (error, newCart) => {
            if (error) {
              throw new BadRequestException(error.message);
            } else {
              return newCart;
            }
          }
        )
        .clone();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async cartRemoveItem(user: User, itemId: String) {
    try {
      const cart = await this.findCart(user);
      return await this.cartModel
        .findByIdAndUpdate(
          cart._id,
          { $pull: { portfolio: { _id: itemId } } },
          { safe: true, upsert: true },
          (error, newCart) => {
            if (error) {
              throw new BadRequestException(error.message);
            } else {
              return newCart;
            }
          }
        )
        .clone();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
