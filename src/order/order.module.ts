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
import { SendGridModule } from '../sendgrid.module';
import { PromocodeModule } from "src/promocode/promocode.module";
import { PromocodeSchema, Promocode } from "src/promocode/promocode.model";

@Module({
  imports: [
    SendGridModule,
    PromocodeModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    MongooseModule.forFeature([
      { name: Promocode.name, schema: PromocodeSchema },
    ]),
    NotificationModule,
    StripeModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
