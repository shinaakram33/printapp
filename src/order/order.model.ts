import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Address } from "../user/user.model";
import mongoose from "mongoose";

export enum orderStatus {
  ORDER_RECIEVED = "ORDER_RECIEVED",
  COMPLETED = "COMPLETED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  CANCELLED = "CANCELLED",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PRINTING = "PRINTING",
}

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
@Schema({
  timestamps: true
})
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [
      {
        image: String,
        title: mongoose.Schema.Types.Mixed,
        category: mongoose.Schema.Types.Mixed,
        size: { type: mongoose.Schema.Types.Mixed },
        priceChart: { type: mongoose.Schema.Types.Mixed },
        preview: Boolean,
        designUrl: [String],
        designFileUrl: [String],
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
      size: { type: Size };
      priceChart: { type: PriceChart };
      preview: Boolean;
      designUrl: [String];
      designFileUrl: [String];
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

  @Prop({ required: true })
  orderRefrence: String;

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

  @Prop({ required: true })
  status: orderStatus;

  @Prop({ required: false })
  deliveryCost: number;

  @Prop({ required: false })
  createdAt: Date;

  @Prop({ required: false, default: false })
  sendByMail: boolean;
}

export type orderDocument = Order & Document;
const OrderSchema = SchemaFactory.createForClass(Order);
export { OrderSchema };
