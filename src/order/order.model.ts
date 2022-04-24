import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Product } from "../products/products.model";
import { Address } from "../user/user.model";
import mongoose from "mongoose";
@Schema()
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: String;

  @Prop({ required: true })
  products: Product[];

  @Prop({ required: true })
  orderDate: String;

  @Prop({ required: true })
  deliveryMethod: String;

  @Prop({ required: true })
  deliveryAddress: Address;

  @Prop({ required: true })
  paymentMethod: String;

  @Prop({ required: true })
  subTotal: number;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  total: number;
}

export type orderDocument = Order & Document;
const OrderSchema = SchemaFactory.createForClass(Order);
export { OrderSchema };
