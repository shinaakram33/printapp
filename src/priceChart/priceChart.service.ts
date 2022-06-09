import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PriceChart, priceChartDocument } from './priceChart.model';

@Injectable()
export class PriceChartService {
  constructor(
    @InjectModel(PriceChart.name)
    private priceChartModel: Model<priceChartDocument>,
    private configService: ConfigService
  ) {}

  async getBussinessCard(product: string, size: string, corner: string, spotUVSide: string): Promise<any> {
    try {
      const priceChartParams: any = { product, size, corner };
      if (spotUVSide) priceChartParams.spotUVSide = spotUVSide;

      const priceChart = await this.priceChartModel.find(priceChartParams);

      if (!priceChart) throw new NotFoundException('No data found');
      return priceChart;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getBooklet(product: string, size: string, innerPageNumber: string): Promise<any> {
    try {
      const priceChart = await this.priceChartModel.find({
        product,
        size,
        innerPageNumber,
      });
      if (!priceChart) throw new NotFoundException('No data found');
      else return priceChart;
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
      if (!priceChart) throw new NotFoundException('No data found');
      else return priceChart;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getFlyer(product: String, size: String, paperType: String, folding: String): Promise<any> {
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
      if (!priceChart) throw new NotFoundException('No data found');
      else return priceChart;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getletterhead(product: String): Promise<any> {
    try {
      const priceChart = await this.priceChartModel.find({ product });
      if (!priceChart) throw new NotFoundException('No data found');
      else return priceChart;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPoster(product: String, size: String, paperType: String, sides: String): Promise<any> {
    try {
      const priceChart = await this.priceChartModel.find({
        product,
        size,
        paperType,
        sides,
      });
      if (!priceChart) throw new NotFoundException('No data found');
      else return priceChart;
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
      if (!priceChart) throw new NotFoundException('No data found');
      else return priceChart;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
