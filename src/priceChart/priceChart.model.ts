import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class PriceChart {
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  product: String;

  @Prop()
  size: String;

  @Prop()
  corner: String;

  @Prop()
  innerPageNumber: String;

  @Prop()
  coverPageType: String;

  @Prop()
  innerPageType: String;

  @Prop()
  coverPageNumber: String;

  @Prop()
  spotUVSide: String;

  @Prop()
  window: String;

  @Prop()
  paperType: String;

  @Prop()
  folding: String;

  @Prop()
  paper: String;

  @Prop()
  sides: String;

  @Prop()
  shape: String;

  @Prop()
  units: Number;

  @Prop()
  price: Number;

  @Prop()
  priceChange: Number;

  @Prop()
  adjustedPrice: Number;

  @Prop()
  pricePerUnit: Number;

  @Prop()
  deliveryCost: Number;
}

export type priceChartDocument = PriceChart & Document;
const PriceChartSchema = SchemaFactory.createForClass(PriceChart);
export { PriceChartSchema };
