import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  full_name: string;

  @Prop({ required: true })
  phone: string;
  
  @Prop()
  email: string;

  @Prop()
  password: string;
  
}

export type UserDocument = User & Document;
const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('full_name').get(function (this: UserDocument) {
    return `${this.first_name} ${this.last_name}`;
});
export { UserSchema }