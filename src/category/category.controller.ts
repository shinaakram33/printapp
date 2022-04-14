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
import { AddCategoryDto } from "./dto/add-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryService } from "./Category.service";
import { GetUser } from "src/user/auth/get-user.decorator";
import { User } from "../user/user.model";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@Controller("category")
@ApiTags("Category meta-data Controller")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiBearerAuth()
  @Post("/add")
  @UseGuards(AuthGuard("jwt"))
  async addCategory(
    @GetUser() user: User,
    @Body() addCategoryDto: AddCategoryDto
  ): Promise<any> {
    return await this.categoryService.addCategory(user, addCategoryDto);
  }

  @ApiBearerAuth()
  @Delete("/delete/:id")
  @UseGuards(AuthGuard("jwt"))
  async deleteCategory(
    @GetUser() user: User,
    @Param(":id") id: string
  ): Promise<any> {
    return await this.categoryService.deleteCategory(user, id);
  }

  @ApiBearerAuth()
  @Patch("/update/id")
  @UseGuards(AuthGuard("jwt"))
  async updateCategory(
    @GetUser() user: User,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param(":id") id: string
  ): Promise<any> {
    return await this.categoryService.updateCategory(
      user,
      id,
      updateCategoryDto
    );
  }

  @Get("/findall")
  async findAllCategory(): Promise<any> {
    return await this.categoryService.findAllCategory();
  }

  @Get("/find/:id")
  async findCategory(@Param(":id") id: string): Promise<any> {
    return await this.categoryService.findCategory(id);
  }
}
