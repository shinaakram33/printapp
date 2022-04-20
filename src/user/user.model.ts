import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
@Schema()
export class User {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;
}

export type UserDocument = User & Document;
const UserSchema = SchemaFactory.createForClass(User);
export { UserSchema };
