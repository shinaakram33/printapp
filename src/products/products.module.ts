import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsController } from "./products.controller";
import { Products, ProductSchema } from "./products.model";
import { ProductsService } from "./products.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ConfigService],
  exports: [ProductsService],
})
export class ProductsModule {}
