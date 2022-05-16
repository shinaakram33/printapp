import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { User } from "../user/user.model";
import { PriceChart, priceChartDocument } from "./priceChart.model";

@Injectable()
export class PriceChartService {
  constructor(
    @InjectModel(PriceChart.name)
    private priceChartModel: Model<priceChartDocument>,
    private configService: ConfigService
  ) {}
}
