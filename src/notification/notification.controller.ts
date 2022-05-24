import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { Notification } from "./notification.model";

@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post("/create_notification")
  createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Get("/:id")
  getUserNotifications(@Param("id") id: string): Promise<Notification> {
    return this.notificationService.getUserNotifications(id);
  }
}
