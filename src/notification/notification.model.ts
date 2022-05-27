import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Notification {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: true })
  Date: String;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ type: String })
  message: String;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
// export { NotificationSchema };
