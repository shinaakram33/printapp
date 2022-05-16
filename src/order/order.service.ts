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
      return await this.orderModel.create({ userId: user._id, addOrderDto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOrder(
    id: String,
    user: User,
    updateOrderDto: UpdateOrderDto
  ): Promise<any> {
    try {
      if (user.role !== "USER") {
        return await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
