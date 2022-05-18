import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { PriceChart, priceChartDocument } from "./priceChart.model";

@Injectable()
export class PriceChartService {
  constructor(
    @InjectModel(PriceChart.name)
    private priceChartModel: Model<priceChartDocument>,
    private configService: ConfigService
  ) {}

  async getBussinessCard(
    product: String,
    size: String,
    corner: String,
    spotUVSide: String
  ): Promise<any> {
    try {
      let priceChart;
      if (spotUVSide) {
        priceChart = await this.priceChartModel.find({
          product,
          size,
          corner,
          spotUVSide,
        });
      } else {
        priceChart = await this.priceChartModel.find({
          product,
          size,
          corner,
        });
      }
      if (!priceChart) throw new NotFoundException("No data found");
      else return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getBooklet(
    product: String,
    size: String,
    innerPageNumber: String
  ): Promise<any> {
    try {
      const priceChart = await this.priceChartModel.find({
        product,
        size,
        innerPageNumber,
      });
      if (!priceChart) throw new NotFoundException("No data found");
      else return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getEnvelop(product: String, window: String): Promise<any> {
    try {
      const priceChart = await this.priceChartModel.find({
        product,
        window,
      });
      if (!priceChart) throw new NotFoundException("No data found");
      else return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getFlyer(
    product: String,
    size: String,
    paperType: String,
    folding: String
  ): Promise<any> {
    try {
      let priceChart;
      if (folding) {
        priceChart = await this.priceChartModel.find({
          product,
          size,
          paperType,
          folding,
        });
      } else {
        priceChart = await this.priceChartModel.find({
          product,
          size,
          paperType,
        });
      }
      if (!priceChart) throw new NotFoundException("No data found");
      else return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getletterhead(product: String): Promise<any> {
    try {
      const priceChart = await this.priceChartModel.find({ product });
      if (!priceChart) throw new NotFoundException("No data found");
      else return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPoster(
    product: String,
    size: String,
    paperType: String,
    sides: String
  ): Promise<any> {
    try {
      const priceChart = await this.priceChartModel.find({
        product,
        size,
        paperType,
        sides,
      });
      if (!priceChart) throw new NotFoundException("No data found");
      else return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getSticker(product: String, size: String, shape: String): Promise<any> {
    try {
      const priceChart = await this.priceChartModel.find({
        product,
        size,
        shape,
      });
      if (!priceChart) throw new NotFoundException("No data found");
      else return;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
