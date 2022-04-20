import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { User } from "../user/user.model";
import { HomeSlider, homeSliderDocument } from "./home-slider.model";
import { AddHomeSliderDto } from "./dto/add-homeSlider.dto";
import { UpdateHomeSliderDto } from "./dto/update-homeSlider.dto";

@Injectable()
export class HomeSliderService {
  constructor(
    @InjectModel(HomeSlider.name)
    private homeSliderModel: Model<homeSliderDocument>,
    private configService: ConfigService
  ) {}

  async addSlider(
    user: User,
    addhomeSliderDto: AddHomeSliderDto
  ): Promise<HomeSlider> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      return await this.homeSliderModel.create(addhomeSliderDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteSlider(user: User, id: string) {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      return await this.homeSliderModel.findByIdAndDelete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateSlider(
    user: User,
    id: string,
    updateHomeSliderDto: UpdateHomeSliderDto
  ): Promise<HomeSlider> {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      return await this.homeSliderModel.findByIdAndUpdate(
        id,
        updateHomeSliderDto,
        {
          new: true,
        }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllSlides() {
    try {
      return await this.homeSliderModel.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
