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
import { AddProductDto } from "./dto/add-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";
import { GetUser } from "src/user/auth/get-user.decorator";
import { User } from "../user/user.model";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

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
    @Param(":id") id: string
  ): Promise<any> {
    return await this.productsService.deleteProduct(user, id);
  }

  @ApiBearerAuth()
  @Patch("/update/id")
  @UseGuards(AuthGuard("jwt"))
  async updateProduct(
    @GetUser() user: User,
    @Body() updateProductDto: UpdateProductDto,
    @Param(":id") id: string
  ): Promise<any> {
    return await this.productsService.updateProduct(user, id, updateProductDto);
  }

  @Get("/findall")
  async findAllProducts(): Promise<any> {
    return await this.productsService.findAllProduct();
  }

  @Get("/find/:id")
  async findProduct(@Param(":id") id: string): Promise<any> {
    return await this.productsService.findProduct(id);
  }
}
