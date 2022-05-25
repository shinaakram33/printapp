import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  NotificationSchema,
  Notification,
} from "src/notification/notification.model";
import { NotificationModule } from "src/notification/notification.module";
import { NotificationService } from "src/notification/notification.service";
import { StripeModule } from "src/stripe/stripe.module";
import { OrderController } from "./order.controller";
import { Order, OrderSchema } from "./order.model";
import { OrderService } from "./order.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    // MongooseModule.forFeature([
    //   { name: Notification.name, schema: NotificationSchema },
    // ]),
    // NotificationModule,
    StripeModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
