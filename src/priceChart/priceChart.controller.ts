import { Body, Controller, Get, UseGuards, Query } from "@nestjs/common";
import { GetUser } from "src/user/auth/get-user.decorator";
import { User } from "../user/user.model";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { PriceChartService } from "./priceChart.service";
import { query } from "express";

@Controller("price-chart")
@ApiTags("Price Chart Controller")
export class HomeSliderController {
  constructor(private priceChartService: PriceChartService) {}
}
