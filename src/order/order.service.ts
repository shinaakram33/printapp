import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, orderDocument, orderStatus } from './order.model';
import { User } from '../user/user.model';
import { AddOrderDto } from './dto/add-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NotificationService } from 'src/notification/notification.service';
import { CodeBuild } from 'aws-sdk';

@Injectable()
export class OrderService {
  private logger = new Logger();
  constructor(
    @InjectModel(Order.name) private orderModel: Model<orderDocument>,
    private notificationService: NotificationService
  ) {}

  async getAllUserOrders(user: User) {
    return this.orderModel.find({ userId: user._id });
  }

  async addOrder(user: User, addOrderDto: AddOrderDto): Promise<any> {
    try {
      const order = await this.orderModel.create({
        userId: user._id,
        createdBy: user._id,
        ...addOrderDto,
      });
      /* const notification = await this.notificationService.generateNotification(
        `Order ${order._id} has been changed to ${order.status}`,
        user._id.toString()
      ); */
      return order;
    } catch (error) {
      this.logger.log('Add Order failed', error);
      throw new BadRequestException(error.message);
    }
  }

  //for admin
  async addOrderAdmin(user: User, addOrderDto: AddOrderDto, userId: string): Promise<Order> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      } else {
        const order = await this.orderModel.create({
          user: userId,
          createdBy: user._id,
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

  async updateOrderAdmin(id: string, user: User, updateOrderDto: UpdateOrderDto, userId: string): Promise<any> {
    try {
      console.log(id,userId, updateOrderDto, user)
      if (!user || user.role == 'USER') {
        throw new UnauthorizedException('You are not authorize to perform this operation.');
      } else {
        console.log(updateOrderDto)
        const order = await this.orderModel.findOneAndUpdate({_id: id},updateOrderDto, { new: true });

        console.log(order);
        // const notification = await this.notificationService.generateNotification(
        //   `Order ${order._id} has been changed to ${order.status}`,
        //   userId
        // );
        return order;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteOrderAdmin(id: String, user: User): Promise<any> {
    try {
      if (!user || user.role == 'USER') {
        throw new UnauthorizedException('You are not authorize to perform this operation.');
      } else {
        return await this.orderModel.findByIdAndDelete(id);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllOrderAdmin(user: User): Promise<any> {
    try {
      if (!user || user.role == 'USER') {
        throw new UnauthorizedException('You are not authorize to perform this operation.');
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

  async getUserPreviousOrders(userId: string): Promise<any> {
    return this.orderModel.find({ userId, status: { $in: [orderStatus.COMPLETED, orderStatus.CANCELLED] }} ).populate('createdBy userId');
  }
}
