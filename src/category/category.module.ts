import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryController } from "./Category.controller";
import { Category, CategorySchema } from "./Category.model";
import { CategoryService } from "./Category.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, ConfigService],
  exports: [CategoryService],
})
export class CategoryModule {}
