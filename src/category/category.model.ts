import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

enum Category_types {
  BUSINESS_CARD = "BUSINESS_CARD",
  BOOKLET = "BOOKLET",
  POSTER = "POSTER",
  FLYERS_LEAFLET = "FLYERS_LEAFLET",
  STICKERS_LABEL = "STICKERS_LABEL",
  ENVELOPE = "ENVELOPE",
  LETTERHEAD = "LETTERHEAD",
}

@Schema()
export class Category {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  deliveryTime: string;

  @Prop()
  priceDescription: string;

  @Prop()
  category: Category_types;
}

export type categoryDocument = Category & Document;
const CategorySchema = SchemaFactory.createForClass(Category);
export { CategorySchema };
