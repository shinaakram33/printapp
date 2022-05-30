import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import mongoose from "mongoose";

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
  height: String;

  @Prop({ required: true })
  width: String;
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
  cutHeight: String;

  @Prop()
  cutWidth: String;
}

class Window extends Document {
  @Prop()
  windowName: String;

  @Prop()
  windowHeight: String;

  @Prop()
  windowWidth: String;
}

class Folding extends Document {
  @Prop()
  foldingName: String;

  @Prop()
  foldingHeight: String;

  @Prop()
  foldingWidth: String;
}
@Schema()
export class Product extends Document {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  image: String;

  @Prop({ required: true })
  title: CategoryTypes;

  @Prop({ required: true })
  category: Category;

  @Prop({ required: true })
  size: [{ type: Size }];

  @Prop({ required: true })
  priceChart: [{ type: PriceChart }];

  @Prop({ required: true })
  preview: Boolean;

  @Prop({ required: true })
  designUrl: String;

  @Prop({ required: true })
  remarks: String;

  @Prop({ required: false })
  corner: Corner;

  @Prop({ required: false })
  paperType: String;

  @Prop({ required: false })
  spotUV: String;

  @Prop({ required: false })
  finishing: String;

  @Prop({ required: false })
  numberOfSides: String;

  @Prop({ required: false })
  numberOfPages: NumberOfPages;

  @Prop({ required: false })
  cut: Cut;

  @Prop({ required: false })
  window: Window;

  @Prop({ required: false })
  folding: Folding;
}

@Schema()
export class Cart {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [
      {
        image: String,
        title: mongoose.Schema.Types.Mixed,
        category: mongoose.Schema.Types.Mixed,
        size: { type: mongoose.Schema.Types.Mixed },
        priceChart: { type: mongoose.Schema.Types.Mixed },
        preview: Boolean,
        designUrl: String,
        remarks: String,
        corner: mongoose.Schema.Types.Mixed,
        paperType: String,
        spotUV: String,
        finishing: String,
        numberOfSides: String,
        numberOfPages: mongoose.Schema.Types.Mixed,
        cut: mongoose.Schema.Types.Mixed,
        window: mongoose.Schema.Types.Mixed,
        folding: mongoose.Schema.Types.Mixed,
      },
    ],
  })
  products: [
    {
      image: String;
      title: CategoryTypes;
      category: Category;
      size: [{ type: Size }];
      priceChart: [{ type: PriceChart }];
      preview: Boolean;
      designUrl: String;
      remarks: String;
      corner: Corner;
      paperType: String;
      spotUV: String;
      finishing: String;
      numberOfSides: String;
      numberOfPages: NumberOfPages;
      cut: Cut;
      window: Window;
      folding: Folding;
    }
  ];
}

export type cartDocument = Cart & Document;
const CartSchema = SchemaFactory.createForClass(Cart);
export { CartSchema };
