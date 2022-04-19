import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryController } from "./category.controller";
import { Category, CategorySchema } from "./category.model";
import { CategoryService } from "./category.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, ConfigService],
})
export class CategoryModule {}
