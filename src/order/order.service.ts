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
import { NotificationService } from "src/notification/notification.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<orderDocument>,
    private notificationService: NotificationService
  ) {}

  async addOrder(user: User, addOrderDto: AddOrderDto): Promise<any> {
    try {
      const order = await this.orderModel.create({
        user: user._id,
        addOrderDto,
      });
      const notification = await this.notificationService.generateNotification(
        `Order ${order._id} has been changed to ${order.status}`,
        user._id.toString()
      );
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //for admin
  async addOrderAdmin(
    user: User,
    addOrderDto: AddOrderDto,
    userId: string
  ): Promise<any> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      } else {
        const order = await this.orderModel.create({
          user: userId,
          addOrderDto,
        });
        const notification =
          await this.notificationService.generateNotification(
            `Order ${order._id} has been changed to ${order.status}`,
            userId
          );
        return order;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOrderAdmin(
    id: String,
    user: User,
    updateOrderDto: UpdateOrderDto,
    userId: string
  ): Promise<any> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      } else {
        const order = await this.orderModel.findByIdAndUpdate(id, {
          user: userId,
          updateOrderDto,
        });

        const notification =
          await this.notificationService.generateNotification(
            `Order ${order._id} has been changed to ${order.status}`,
            userId
          );
        return order;
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

  async getOrderAdmin(user: User, orderId: String): Promise<any> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      } else {
        return await this.orderModel.findById(orderId);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
