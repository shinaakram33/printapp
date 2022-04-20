import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Document, Schema as MongooseSchema } from "mongoose";
import Api from "twilio/lib/rest/Api";

export enum CategoryTypes {
  BUSINESS_CARD = "BUSINESS_CARD",
  BOOKLET = "BOOKLET",
  POSTER = "POSTER",
  FLYERS_LEAFLET = "FLYERS_LEAFLET",
  STICKERS_LABEL = "STICKERS_LABEL",
  ENVELOPE = "ENVELOPE",
  LETTERHEAD = "LETTERHEAD",
}

class Category extends Document {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  pricePerHunderd: String;

  @Prop({ required: true })
  description: String;

  @Prop({ required: true })
  paperType: String;

  @Prop({ required: true })
  leadTime: String;

  @Prop({ required: true })
  colour: String;

  @Prop({ required: true })
  sizes: String;
}

class Size extends Document {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  description: String;
}

class PriceChart extends Document {
  @Prop({ required: true })
  quantity: String;

  @Prop({ required: true })
  unitPrice: String;
}

class NumberOfPages extends Document {
  @Prop()
  pageName: String;

  @Prop()
  number: number;
}

class Corner extends Document {
  @Prop()
  cornerName: String;

  @Prop()
  cornerDescription: String;
}

class Cut extends Document {
  @Prop()
  cutName: String;

  @Prop()
  cutDescription: String;
}

class Window extends Document {
  @Prop()
  windowName: String;

  @Prop()
  windowDescription: String;
}

@Schema()
export class Product {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  image: [];

  @Prop({ required: true })
  title: CategoryTypes;

  @Prop({ required: true })
  category: Category;

  @Prop({ required: true })
  size: Size;

  @Prop({ required: true })
  priceChart: [{ type: PriceChart }];

  @Prop({ required: true })
  preview: Boolean;

  @Prop({ required: true })
  designUrl: String;

  @Prop({ required: true })
  remarks: String;

  @ApiPropertyOptional()
  corner: Corner;

  @ApiPropertyOptional()
  paperType: String[];

  @ApiPropertyOptional()
  spotUV: String[];

  @ApiPropertyOptional()
  finishing: String[];

  @ApiPropertyOptional()
  numberOfSides: String[];

  @ApiPropertyOptional()
  numberOfPages: NumberOfPages;

  @ApiPropertyOptional()
  cut: Cut;

  @ApiPropertyOptional()
  window: Window;
}

export type productDocument = Product & Document;
const ProductSchema = SchemaFactory.createForClass(Product);
export { ProductSchema };
