import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { orderStatus } from "src/order/order.model";

@Schema({
  timestamps: true
})
export class Notification {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Order" })
  orderId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ type: String })
  message: String;

  @Prop()
  orderStatus: orderStatus
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
// export { NotificationSchema };
