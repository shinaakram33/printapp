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
import { Products, ProductDocument } from "./products.model";
import { ConfigService } from "@nestjs/config";
import { AddProductDto } from "./dto/add-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { User } from "../user/user.model";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<ProductDocument>,
    private configService: ConfigService
  ) {}

  async addProduct(
    user: User,
    addProductDto: AddProductDto
  ): Promise<Products> {
    if (!user || user.role == "USER") {
      throw new UnauthorizedException(
        "You are not authorize to perform this operation."
      );
    }
    return await this.productModel.create(addProductDto);
  }

  async deleteProduct(user: User, id: string) {
    if (!user || user.role == "USER") {
      throw new UnauthorizedException(
        "You are not authorize to perform this operation."
      );
    }
    return await this.productModel.findByIdAndDelete(id);
  }

  async findProduct(id: string): Promise<Products> {
    return await this.productModel.findById(id);
  }
  async updateProduct(
    user: User,
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Products> {
    if (!user || user.role == "USER") {
      throw new UnauthorizedException(
        "You are not authorize to perform this operation."
      );
    }
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  async findAllProduct() {
    return await this.productModel.find();
  }
}
