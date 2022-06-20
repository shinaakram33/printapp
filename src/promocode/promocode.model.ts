import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { CategoryTypes } from "src/products/products.model";

export enum PromoTypes {
  DELIVERY_CHARGES = "DELIVERY_CHARGES",
  PERCENTAGE = "PERCENTAGE",
  AMOUNT = "AMOUNT",
}
class PromoType extends Document {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  type: PromoTypes;
}

@Schema()
export class Promocode {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  category: CategoryTypes;

  @Prop({ default: "Active" })
  status: String;

  @Prop()
  promoType: PromoType;

  @Prop({ required: true })
  discount: String;

  @Prop({ required: true, default: 0 })
  noOfTimeUsed: Number;

  @Prop({ required: true })
  date: String;

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export type PromocodeDocument = Promocode & Document;
const PromocodeSchema = SchemaFactory.createForClass(Promocode);
export { PromocodeSchema };
