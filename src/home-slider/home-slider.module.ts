import { Module } from "@nestjs/common";
import { HomeSliderController } from "./home-slider.controller";
import { HomeSliderService } from "./home-slider.service";
import { MongooseModule } from "@nestjs/mongoose";
import { HomeSlider, HomeSliderSchema } from "./home-slider.model";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HomeSlider.name, schema: HomeSliderSchema },
    ]),
  ],
  controllers: [HomeSliderController],
  providers: [HomeSliderService],
})
export class HomeSliderModule {}
