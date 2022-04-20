import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class HomeSlider {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  image: String;

  @Prop({ required: true })
  caption: String;
}

export type homeSliderDocument = HomeSlider & Document;
const HomeSliderSchema = SchemaFactory.createForClass(HomeSlider);
export { HomeSliderSchema };
