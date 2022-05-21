import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export class Address extends Document {
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

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: Role;

  @Prop({ required: false })
  stripeCustomerId: string;

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
    }
  ];

  @Prop({
    type: [
      {
        cardnumber: String,
        expiry: String,
        cvv: String,
      },
    ],
  })
  cards: [
    {
      cardnumber: String;
      expiry: String;
      cvv: String;
    }
  ];
}

export type UserDocument = User & Document;
const UserSchema = SchemaFactory.createForClass(User);
export { UserSchema };
