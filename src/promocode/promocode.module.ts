import { Module } from "@nestjs/common";
import { PromocodeService } from "./promocode.service";
import { PromocodeController } from "./promocode.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Promocode, PromocodeSchema } from "./promocode.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Promocode.name, schema: PromocodeSchema },
    ]),
  ],
  providers: [PromocodeService],
  controllers: [PromocodeController],
  exports: [PromocodeService]
})
export class PromocodeModule {}
