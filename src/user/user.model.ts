import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class Address extends Document {
  _id: ObjectId;

  @Prop({ required: true })
  fullName: String;

  @Prop({ required: false })
  companyName: String;

  @Prop({ required: true })
  addressLine1: String;

  @Prop({ required: true })
  addressLine2: String;

  @Prop({ required: true })
  area: String;

  @Prop({ required: true })
  district: String;

  @Prop({ required: true })
  cityCountry: String;

  @Prop({ required: true })
  contactNumber: String;

  @Prop({ required: true })
  primary: boolean;
}
@Schema()
export class User {
  _id: ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: Role;

  @Prop({ default: 'Active' })
  status: String;

  @Prop({ required: false })
  stripeCustomerId: string;
  @Prop()
  resetPasswordToken: string;

  @Prop()
  resetPasswordExpires: number;

  @Prop({ type: [String] })
  deviceId: string[];

  @Prop({ default: false })
  payment: boolean;

  @Prop({ default: false })
  created: String;

  @Prop({ default: false })
  date: String;

  @Prop({
    type: [
      {
        fullName: String,
        companyName: String,
        addressLine1: String,
        addressLine2: String,
        area: String,
        district: String,
        cityCountry: String,
        contactNumber: String,
        primary: Boolean,
      },
    ],
  })
  addresses: [
    {
      fullName: String;
      companyName: String;
      addressLine1: String;
      addressLine2: String;
      area: String;
      district: String;
      cityCountry: String;
      contactNumber: String;
      primary: Boolean;
    }
  ];
}

export type UserDocument = User & Document;
const UserSchema = SchemaFactory.createForClass(User);
export { UserSchema };
