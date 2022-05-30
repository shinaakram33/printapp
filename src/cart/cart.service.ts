import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Cart, cartDocument } from "./cart.model";
import { User } from "../user/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";
import { CartAddItemDto } from "./dto/cart-add-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<cartDocument>) {}

  async findCart(user: User): Promise<any> {
    try {
      return await this.cartModel.findOne({ userId: user._id });
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

  async cartAddItem(user: User, cartAddItemDto: CartAddItemDto) {
    try {
      const cart = await this.createCart(user);
      const newCart = await this.cartModel.findOneAndUpdate(
        { _id: cart._id },
        {
          $push: {
            products: cartAddItemDto,
          },
        },
        { safe: true, upsert: true, new: true }
        // (error, newCart) => {
        //   if (error) {
        //     throw new BadRequestException(error.message);
        //   } else {
        //     return newCart;
        //   }
        // }
      );
      return newCart;
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
          { $pull: { products: { _id: itemId } } },
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

  async cartUpdateItem(
    user: User,
    itemId: String,
    updateItemDto: UpdateItemDto
  ) {
    try {
      const cart = await this.findCart(user);
      return await cart.products.findByIdAndUpdate(itemId, updateItemDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async emptyCart(user: User) {
    try {
      const cart = await this.findCart(user);
      if (!cart) {
        throw new BadRequestException("This user has no Cart");
      }
      return await this.cartModel.updateOne(
        { _id: cart._id },
        { $set: { products: [] } },
        { multi: true }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
