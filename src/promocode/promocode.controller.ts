import {
  Controller,
  UseGuards,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { GetUser } from "src/user/auth/get-user.decorator";
import { User } from "src/user/user.model";
import { AddPromocodeDto } from "./dto/add-promocode.dto";
import { UpdatePromocodeDto } from "./dto/update-promocode.dto";
import { PromocodeService } from "./promocode.service";

@Controller("promocode")
@ApiTags("Promo Code Controller")
export class PromocodeController {
  constructor(private promocodeService: PromocodeService) {}

  @ApiBearerAuth()
  @Post("/add")
  @UseGuards(AuthGuard("jwt"))
  async addPromocode(
    @GetUser() user: User,
    @Body() addPromocodeDto: AddPromocodeDto
  ): Promise<any> {
    return await this.promocodeService.addPromocode(user, addPromocodeDto);
  }

  @ApiBearerAuth()
  @Patch("/update/:promoId")
  @UseGuards(AuthGuard("jwt"))
  async updatePromocode(
    @GetUser() user: User,
    @Body() updatePromocodeDto: UpdatePromocodeDto,
    @Param("promoId") promoId: String
  ): Promise<any> {
    return await this.promocodeService.updatePromocode(
      user,
      updatePromocodeDto,
      promoId
    );
  }

  @ApiBearerAuth()
  @Delete("/delete/:promoId")
  @UseGuards(AuthGuard("jwt"))
  async deletePromocode(
    @GetUser() user: User,
    @Param("promoId") promoId: String
  ): Promise<any> {
    return await this.promocodeService.deletePromocode(user, promoId);
  }

  @ApiBearerAuth()
  @Get("/find/:promoId")
  @UseGuards(AuthGuard("jwt"))
  async getPromocode(
    @GetUser() user: User,
    @Param("promoId") promoId: String
  ): Promise<any> {
    return await this.promocodeService.getPromocode(user, promoId);
  }

  @ApiBearerAuth()
  @Get("/findbyname/:name")
  @UseGuards(AuthGuard("jwt"))
  async getPromocodeByName(
    @GetUser() user: User,
    @Param("name") name: String
  ): Promise<any> {
    return await this.promocodeService.getPromocodeByName(user, name);
  }

  @ApiBearerAuth()
  @Post("/findall")
  @UseGuards(AuthGuard("jwt"))
  async getAllPromocode(@GetUser() user: User): Promise<any> {
    return await this.promocodeService.getAllPromocode(user);
  }
}
