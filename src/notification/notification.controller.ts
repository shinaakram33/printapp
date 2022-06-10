import { Controller, Post, Get, Param, Body, UseGuards } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { Notification } from "./notification.model";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/user/auth/get-user.decorator";
import { User } from "../user/user.model";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiBearerAuth()
  @Post("/user_test")
  @UseGuards(AuthGuard("jwt"))
  getUserNotificationsAndGroupByDate(@GetUser() user: User): Promise<any> {
    return this.notificationService.getUserNotificationsAndGroupByDate(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/create_notification")
  createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/:userId")
  getUserNotifications(@Param("userId") userId: string): Promise<Notification> {
    return this.notificationService.getUserNotifications(userId);
  }

  @Post("/test_notification")
  test() {
    return this.notificationService.testNotifications();
  }

}
