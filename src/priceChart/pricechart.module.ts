import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PriceChartService } from "./priceChart.service";
import { PriceChartController } from "./priceChart.controller";
import { PriceChartSchema, PriceChart } from "./priceChart.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PriceChart.name, schema: PriceChartSchema },
    ]),
  ],
  controllers: [PriceChartController],
  providers: [PriceChartService],
})
export class PriceChartModule {}
