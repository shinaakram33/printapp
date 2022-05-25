import { Controller, Get, UseGuards, Query } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { PriceChartService } from "./priceChart.service";

@Controller("price-chart")
@ApiTags("Price Chart Controller")
export class PriceChartController {
  constructor(private priceChartService: PriceChartService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/businesscard?")
  async getBussinessCard(
    @Query("product") product: String,
    @Query("size") size: String,
    @Query("corner") corner: String,
    @Query("spotuvside") spotUVSide?: String
  ): Promise<any> {
    return await this.priceChartService.getBussinessCard(
      product,
      size,
      corner,
      spotUVSide
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/booklet?")
  async getBooklet(
    @Query("product") product: String,
    @Query("size") size: String,
    @Query("innerpage") innerPageNumber: String
  ): Promise<any> {
    return await this.priceChartService.getBooklet(
      product,
      size,
      innerPageNumber
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/envelop?")
  async getEnvelop(
    @Query("product") product: String,
    @Query("window") window: String
  ): Promise<any> {
    return await this.priceChartService.getEnvelop(product, window);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/flyer?")
  async getFlyer(
    @Query("product") product: String,
    @Query("size") size: String,
    @Query("papertype") paperType: String,
    @Query("folding") folding: String
  ): Promise<any> {
    return await this.priceChartService.getFlyer(
      product,
      size,
      paperType,
      folding
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/letterhead?")
  async getletterhead(@Query("product") product: String): Promise<any> {
    return await this.priceChartService.getletterhead(product);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/poster?")
  async getPoster(
    @Query("product") product: String,
    @Query("size") size: String,
    @Query("papertype") paperType: String,
    @Query("sides") sides?: String
  ): Promise<any> {
    return await this.priceChartService.getPoster(
      product,
      size,
      paperType,
      sides
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/sticker?")
  async getSticker(
    @Query("product") product: String,
    @Query("size") size: String,
    @Query("shape") shape: String
  ): Promise<any> {
    return await this.priceChartService.getBooklet(product, size, shape);
  }
}
