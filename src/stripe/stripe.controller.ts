import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/user/auth/get-user.decorator";
import { User } from "src/user/user.model";
import { AddStripeCardDto } from "./dto/add-card.dto";
import { StripeService } from "./stripe.service";

@Controller("stripe")
@ApiTags("Stripe Controller")
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/getAllCards/")
  async getAllCards(@GetUser() user: User): Promise<any> {
    return await this.stripeService.getAllCards(user);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  // @Post("/addCard/")
  // async addCards(@GetUser() user: User, @Body() addCardDto: AddStripeCardDto): Promise<any> {
  //   return this.stripeService.addCard(addCardDto, user);
  // }
}
