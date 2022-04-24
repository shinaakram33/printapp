import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Product } from "../products/products.model";
import { Address } from "../user/user.model";
import mongoose from "mongoose";
@Schema()
export class Cart {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  products: Product[];

  @Prop({ required: true })
  subTotal: number;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  deliveryCharges: number;

  @Prop({ required: true })
  total: number;
}

export type cartDocument = Cart & Document;
const CartSchema = SchemaFactory.createForClass(Cart);
export { CartSchema };
