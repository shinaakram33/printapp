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
  @Get("/change/status/all")
  @UseGuards(AuthGuard("jwt"))
  changeReadStatusOfAll(): Promise<any> {
    return this.notificationService.changeReadStatusOfAll()
  }

  @ApiBearerAuth()
  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  getUserNotificationsAndGroupByDate(@GetUser() user: User): Promise<any> {
    return this.notificationService.getUserNotificationsAndGroupByDate(user);
  }

  @ApiBearerAuth()
  @Get("/change/status/:id")
  @UseGuards(AuthGuard("jwt"))
  changeReadStatus(@Param('id') id: string): Promise<any> {
    return this.notificationService.changeReadStatus(id)
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
