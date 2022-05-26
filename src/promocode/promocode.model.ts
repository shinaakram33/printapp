import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { CategoryTypes } from "src/products/products.model";

@Schema()
export class Promocode {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: CategoryTypes;

  @Prop({ default: "Active" })
  status: String;

  @Prop({ required: true })
  discount: string;

  @Prop({ required: true, default: 0 })
  noOfTimeUsed: Number;

  @Prop({ required: true })
  Date: String;
}

export type PromocodeDocument = Promocode & Document;
const PromocodeSchema = SchemaFactory.createForClass(Promocode);
export { PromocodeSchema };
