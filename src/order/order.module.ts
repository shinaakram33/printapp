import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StripeModule } from "src/stripe/stripe.module";
import { OrderController } from "./order.controller";
import { Order, OrderSchema } from "./order.model";
import { OrderService } from "./order.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    StripeModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
