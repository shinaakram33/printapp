import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "../user/user.model";

@Schema()
export class Notification {
  @Prop()
  _id: string;

  @Prop({ type: String, ref: "User", required: true })
  to: User;

  @Prop()
  message: string;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
