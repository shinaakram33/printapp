import { ProductsService } from "./products.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "src/user/auth/get-user.decorator";
import { User } from "../user/user.model";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AddProductDto } from "./dto/add-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CategoryTypes, Product } from "./products.model";

@Controller("products")
@ApiTags("Products Controller")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiBearerAuth()
  @Post("/add")
  @UseGuards(AuthGuard("jwt"))
  async addProduct(
    @GetUser() user: User,
    @Body() addProductDto: AddProductDto
  ): Promise<any> {
    return await this.productsService.addProduct(user, addProductDto);
  }

  @ApiBearerAuth()
  @Delete("/delete/:id")
  @UseGuards(AuthGuard("jwt"))
  async deleteProduct(
    @GetUser() user: User,
    @Param("id") id: string
  ): Promise<any> {
    return await this.productsService.deleteProduct(user, id);
  }

  @ApiBearerAuth()
  @Patch("/update/:id")
  @UseGuards(AuthGuard("jwt"))
  async updateProduct(
    @GetUser() user: User,
    @Body() updateProductDto: UpdateProductDto,
    @Param("id") id: string
  ): Promise<Product> {
    return await this.productsService.updateProduct(user, id, updateProductDto);
  }

  @Get("/find/:category")
  async findByCategory(@Param("category") id: CategoryTypes): Promise<any> {
    return await this.productsService.findByCategory(id);
  }

  @Get("/findall")
  async findAll(@GetUser() user: User): Promise<any> {
    return await this.productsService.findAll(user);
  }
}
