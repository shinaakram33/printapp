import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";
import { Order, orderDocument } from "./order.model";
import { ConfigService } from "@nestjs/config";
import { User } from "../user/user.model";
import { AddOrderDto } from "./dto/add-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<orderDocument>
  ) {}

  async addOrder(user: User, addOrderDto: AddOrderDto): Promise<any> {
    try {
      return await this.orderModel.create({ user: user._id, addOrderDto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //for admin
  async addOrderAdmin(
    user: User,
    addOrderDto: AddOrderDto,
    userId: String
  ): Promise<any> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      } else {
        return await this.orderModel.create({ user: userId, addOrderDto });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOrderAdmin(
    id: String,
    user: User,
    updateOrderDto: UpdateOrderDto,
    userId: String
  ): Promise<any> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      } else {
        return await this.orderModel.findByIdAndUpdate(id, {
          user: userId,
          updateOrderDto,
        });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteOrderAdmin(id: String, user: User): Promise<any> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      } else {
        return await this.orderModel.findByIdAndDelete(id);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllOrderAdmin(user: User): Promise<any> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      } else {
        return await this.orderModel.find();
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
