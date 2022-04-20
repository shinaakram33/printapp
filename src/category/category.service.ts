import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";
import { Category, categoryDocument } from "./Category.model";
import { ConfigService } from "@nestjs/config";
import { AddCategoryDto } from "./dto/add-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { User } from "../user/user.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<categoryDocument>,
    private configService: ConfigService
  ) {}

  async addCategory(
    user: User,
    addCategoryDto: AddCategoryDto
  ): Promise<Category> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      return await this.categoryModel.create(addCategoryDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCategory(user: User, id: string) {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      return await this.categoryModel.findByIdAndDelete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findCategory(id: string): Promise<Category> {
    try {
      return await this.categoryModel.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async updateCategory(
    user: User,
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllCategory() {
    try {
      return await this.categoryModel.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
