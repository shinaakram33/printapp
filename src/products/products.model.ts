import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

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
  productType: String;

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

@Schema()
class Size extends Document {
  @Prop({ required: true })
  name: String;

  @Prop({ required: false })
  height: String;

  @Prop({ required: false })
  width: String;

  @Prop({ required: false })
  image: String;
}

const SizeSchema = SchemaFactory.createForClass(Size);

@Schema()
class PriceChart extends Document {
  @Prop({ required: true })
  quantity: String;

  @Prop({ required: true })
  unitPrice: String;
}

const PriceChartSchema = SchemaFactory.createForClass(PriceChart);

@Schema()
class NumberOfPages extends Document {
  @Prop()
  pageName: String;

  @Prop()
  number: number;
}

const NumberOfPagesSchema = SchemaFactory.createForClass(NumberOfPages);

@Schema()
class Corner extends Document {
  @Prop()
  cornerName: String;

  @Prop()
  cornerDescription: String;

  @Prop()
  image: String;
}

const CornerSchema = SchemaFactory.createForClass(Corner);

@Schema()
class Cut extends Document {
  @Prop()
  cutName: String;

  @Prop()
  cutHeight: String;

  @Prop()
  cutWidth: String;
}

const CutSchema = SchemaFactory.createForClass(Cut);

@Schema()
class Window extends Document {
  @Prop()
  windowName: String;

  @Prop()
  windowHeight: String;

  @Prop()
  windowWidth: String;
}

const WindowSchema = SchemaFactory.createForClass(Window);

@Schema()
class Folding extends Document {
  @Prop()
  foldingName: String;

  @Prop()
  foldingHeight: String;

  @Prop()
  foldingWidth: String;
}

const FoldingSchema = SchemaFactory.createForClass(Folding);

@Schema()
export class Product {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  image: [{ type: String }];

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  title: CategoryTypes;

  @Prop({ required: true })
  category: Category;

  @Prop({ required: true, type: [SizeSchema] })
  size: [{ type: Size }];

  @Prop({ required: true, type: [PriceChartSchema] })
  priceChart: [{ type: PriceChart }];

  @Prop({ required: true })
  preview: Boolean;

  @Prop({ required: true })
  designUrl: String;

  @Prop({ required: true })
  remarks: String;

  @Prop({ required: true })
  feature1: String;

  @Prop({ required: true })
  feature2: String;

  @Prop({ required: false, type: [CornerSchema] })
  corner: Corner[];

  @Prop({ required: false, type: [String] })
  paperType: String[];

  @Prop({ required: false, type: [String] })
  spotUV: String[];

  @Prop({ required: false, type: [String] })
  finishing: String[];

  @Prop({ required: false, type: [String] })
  numberOfSides: String[];

  @Prop({ required: false, type: [NumberOfPagesSchema] })
  numberOfPages: NumberOfPages[];

  @Prop({ required: false, type: [CutSchema] })
  cut: Cut[];

  @Prop({ required: false, type: [WindowSchema] })
  window: Window[];

  @Prop({ required: false, type: [FoldingSchema] })
  folding: Folding[];
}

export type productDocument = Product & Document;
const ProductSchema = SchemaFactory.createForClass(Product);
export { ProductSchema };
