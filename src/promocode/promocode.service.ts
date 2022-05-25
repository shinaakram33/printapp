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
import { User } from "../user/user.model";
import { Promocode, PromocodeDocument } from "./promocode.model";
import { AddPromocodeDto } from "./dto/add-promocode.dto";
import { UpdatePromocodeDto } from "./dto/update-promocode.dto";

@Injectable()
export class PromocodeService {
  constructor(
    @InjectModel(Promocode.name)
    private promocodeModel: Model<PromocodeDocument>,
    private configService: ConfigService
  ) {}

  async deletePromocode(user: User, promoId: String) {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      var promocode = await this.promocodeModel.findById(promoId);
      if (!promocode) {
        throw new NotFoundException("No promo code of this Id exists");
      }
      return await this.promocodeModel.findByIdAndDelete(promoId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addPromocode(user: User, addPromocodeDto: AddPromocodeDto) {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      return await this.promocodeModel.create(addPromocodeDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePromocode(
    user: User,
    updatePromocodeDto: UpdatePromocodeDto,
    promoId: String
  ) {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      var promocode = await this.promocodeModel.findById(promoId);
      if (!promocode) {
        throw new NotFoundException("No product of this Id exists");
      }
      return await this.promocodeModel.findByIdAndUpdate(
        promoId,
        updatePromocodeDto,
        {
          new: true,
        }
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPromocode(user: User, promoId: String) {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      return await this.promocodeModel.findById(promoId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllPromocode(user: User) {
    try {
      if (!user || user.role == "USER") {
        throw new UnauthorizedException(
          "You are not authorize to perform this operation."
        );
      }
      return await this.promocodeModel.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
