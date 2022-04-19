import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { Model, Schema as MongooseSchema } from "mongoose";
import { CategoryTypes, Product, productDocument } from "./products.model";
import { User } from "../user/user.model";
import { AddProductDto } from "./dto/add-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<productDocument>,
    private configService: ConfigService
  ) {}

  async deleteProduct(user: User, id: string) {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      var product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException("No product of this Id exists");
      }
      return await this.productModel.findByIdAndDelete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addProduct(user: User, addProductDto: AddProductDto) {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      return await this.productModel.create(addProductDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateProduct(
    user: User,
    id: string,
    updateProductDto: UpdateProductDto
  ) {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      var product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException("No product of this Id exists");
      }
      return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByCategory(category: CategoryTypes) {
    try {
      console.log("category", category);
      return await this.productModel.find({ title: category });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
