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
import { HomeSliderService } from "./home-slider.service";
import { AddHomeSliderDto } from "./dto/add-homeSlider.dto";
import { UpdateHomeSliderDto } from "./dto/update-homeSlider.dto";

@Controller("home-slider")
@ApiTags("Home Slider Controller")
export class HomeSliderController {
  constructor(private homeSliderService: HomeSliderService) {}

  @ApiBearerAuth()
  @Post("/add")
  @UseGuards(AuthGuard("jwt"))
  async addCategory(
    @GetUser() user: User,
    @Body() addHomeSliderDto: AddHomeSliderDto
  ): Promise<any> {
    return await this.homeSliderService.addSlider(user, addHomeSliderDto);
  }

  @ApiBearerAuth()
  @Delete("/delete/:id")
  @UseGuards(AuthGuard("jwt"))
  async deleteCategory(
    @GetUser() user: User,
    @Param("id") id: string
  ): Promise<any> {
    return await this.homeSliderService.deleteSlider(user, id);
  }

  @ApiBearerAuth()
  @Patch("/update/:id")
  @UseGuards(AuthGuard("jwt"))
  async updateCategory(
    @Param("id") id: string,
    @GetUser() user: User,
    @Body() updateHomeSliderDto: UpdateHomeSliderDto
  ): Promise<any> {
    var response = await this.homeSliderService.updateSlider(
      user,
      id,
      updateHomeSliderDto
    );
    return response;
  }

  @Get("/findall")
  async findAllCategory(): Promise<any> {
    return await this.homeSliderService.findAllSlides();
  }
}
