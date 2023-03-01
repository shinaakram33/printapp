import { Injectable, BadRequestException } from '@nestjs/common';
import { Notification, NotificationDocument } from './notification.model';
import { User, UserDocument } from '../user/user.model';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Schema as MongooseSchema } from 'mongoose';
import { OneSignalService } from 'onesignal-api-client-nest';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationBySegmentBuilder, NotificationByDeviceBuilder } from 'onesignal-api-client-core';
import { v4 as uuidv4 } from 'uuid';
import { orderStatus } from 'src/order/order.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly oneSignalService: OneSignalService
  ) {}

  async createNotification(createNotificationDto: CreateNotificationDto) {
    try {
      const findUserToGetDeviceId = await this.userModel.findById(createNotificationDto.userId);

      const sendNotification = await this.oneSignalService.createNotification({
        contents: { en: createNotificationDto.message },
        include_player_ids: findUserToGetDeviceId.deviceId,
      });

      const notification = await this.notificationModel.create(createNotificationDto);
      return notification;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async generateNotification(message: string, to: string, orderStatus: orderStatus, orderId: String) {
    try {
      const findUserToGetDeviceId = await this.userModel.findById(to);
      if (findUserToGetDeviceId.deviceId) {
        const sendNotification = await this.oneSignalService.createNotification({
          contents: { en: message },
          include_player_ids: findUserToGetDeviceId.deviceId,
          app_url: 'mychat://activity',
        });
        const notification = await this.notificationModel.create({
          userId: to,
          message: message,
          orderStatus,
          orderId
        });

        return notification;
      }
      return 'Device Id not found';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async testNotifications() {
    try {
      const sendNotification = await this.oneSignalService.createNotification({
        contents: { en: 'Testing Notifications' },
        include_player_ids: ['b94b95d5-e1d2-4b5f-abc0-a2792353ee0e'],
        app_url: 'demo://app/splash',
      });
      // const notification = await this.notificationModel.create({
      //   userId: '62a2f123d287a98f522c7995',
      //   message: 'TEST',
      // });
      return sendNotification;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserNotifications(id: string): Promise<Notification> {
    try {
      return await this.notificationModel.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserNotificationsAndGroupByDate(user: User): Promise<any> {
    try {
      return await this.notificationModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(user._id.toString()),
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            notifications: {
              $push: '$$ROOT',
            },
          },
        },
      ]);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeReadStatus(id: string): Promise<any> {
    try {
      return await this.notificationModel.findOneAndUpdate({ _id: id }, { isRead: true }, { new: true });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changeReadStatusOfAll(): Promise<any> {
    try {
      return await this.notificationModel.updateMany(
        { isRead: false },
        { $set: { isRead: true } }
      )
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}
