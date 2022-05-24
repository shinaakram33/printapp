import { Injectable, BadRequestException } from "@nestjs/common";
import { Notification, NotificationDocument } from "./notification.model";
import { User, UserDocument } from "../user/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";
import { OneSignalService } from "onesignal-api-client-nest";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { v4 as uuidv4 } from "uuid";

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
      const findUserToGetDeviceId = await this.userModel.findById(
        createNotificationDto.to
      );

      const sendNotification = await this.oneSignalService.createNotification({
        contents: { en: createNotificationDto.message },
        //include_player_ids: findUserToGetDeviceId.deviceId,
        app_url: "demo://app/home",
      });

      const notification = await this.notificationModel.create(
        createNotificationDto
      );
      return notification;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async generateNotification(message: string, to: string, from: string) {
    try {
      const findUserToGetDeviceId = await this.userModel.findById(to);
      const sendNotification = await this.oneSignalService.createNotification({
        contents: { en: message },
        //include_player_ids: findUserToGetDeviceId.deviceId,
        app_url: "demo://app/home",
      });
      let id = uuidv4();

      const notification = await this.notificationModel.create({
        _id: id,
        to: to,
        message: message,
      });
      return notification;
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
}
