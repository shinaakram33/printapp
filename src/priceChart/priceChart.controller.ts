import { Controller, Get, UseGuards, Query } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { PriceChartService } from "./priceChart.service";

@Controller("price-chart")
@ApiTags("Price Chart Controller")
export class PriceChartController {
  constructor(private priceChartService: PriceChartService) {}

  @Get("/businesscard?")
  async getBussinessCard(
    @Query("product") product: string,
    @Query("size") size: string,
    @Query("corner") corner: string,
    @Query("spotuvside") spotUVSide?: string
  ): Promise<any> {
    return await this.priceChartService.getBussinessCard(product, size, corner, spotUVSide);
  }

  @Get("/booklet?")
  async getBooklet(
    @Query("product") product: string,
    @Query("size") size: string,
    @Query("innerpage") innerPageNumber: string
  ): Promise<any> {
    return await this.priceChartService.getBooklet(product, size, innerPageNumber);
  }

  @Get("/envelop?")
  async getEnvelop(@Query("product") product: string, @Query("window") window: string): Promise<any> {
    return await this.priceChartService.getEnvelop(product, window);
  }

  @Get("/flyer?")
  async getFlyer(
    @Query("product") product: string,
    @Query("size") size: string,
    @Query("papertype") paperType: string,
    @Query("folding") folding: string
  ): Promise<any> {
    return await this.priceChartService.getFlyer(product, size, paperType, folding);
  }

  @Get("/letterhead?")
  async getletterhead(@Query("product") product: string): Promise<any> {
    return await this.priceChartService.getletterhead(product);
  }

  @Get("/poster?")
  async getPoster(
    @Query("product") product: string,
    @Query("size") size: string,
    @Query("papertype") paperType: string,
    @Query("sides") sides?: string
  ): Promise<any> {
    return await this.priceChartService.getPoster(product, size, paperType, sides);
  }

  @Get("/sticker?")
  async getSticker(
    @Query("product") product: string,
    @Query("size") size: string,
    @Query("shape") shape: string
  ): Promise<any> {
    return await this.priceChartService.getSticker(product, size, shape);
  }
}
