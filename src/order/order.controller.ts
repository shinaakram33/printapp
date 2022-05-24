import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "src/user/auth/get-user.decorator";
import { User } from "../user/user.model";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AddOrderDto } from "./dto/add-order.dto";
import { OrderService } from "./order.service";
import { UpdateOrderDto } from "./dto/update-order.dto";
import CreateChargeDto from "./dto/createCharge.dto";
import { StripeService } from "../stripe/stripe.service";

@Controller("order")
export class OrderController {
  constructor(
    private orderService: OrderService,
    private readonly stripeService: StripeService
  ) {}

  @ApiBearerAuth()
  @Post("/charge")
  @UseGuards(AuthGuard("jwt"))
  async createCharge(@Body() charge: CreateChargeDto, @GetUser() user: User) {
    await this.stripeService.charge(
      charge.amount,
      charge.paymentMethodId,
      user.stripeCustomerId
    );
  }

  @ApiBearerAuth()
  @Post("/add")
  @UseGuards(AuthGuard("jwt"))
  async addOrder(
    @GetUser() user: User,
    @Body() addOrderDto: AddOrderDto
  ): Promise<any> {
    return await this.orderService.addOrder(user, addOrderDto);
  }

  @ApiBearerAuth()
  @Post("/admin/add")
  @UseGuards(AuthGuard("jwt"))
  async addOrderAdmin(
    @GetUser() user: User,
    @Body() addOrderDto: AddOrderDto,
    userId: String
  ): Promise<any> {
    return await this.orderService.addOrderAdmin(user, addOrderDto, userId);
  }

  @ApiBearerAuth()
  @Patch("/update/:id")
  @UseGuards(AuthGuard("jwt"))
  async updateOrder(
    @Param("id") id: String,
    @GetUser()
    user: User,
    @Body() updateOrderDto: UpdateOrderDto,
    userId: String
  ): Promise<any> {
    return await this.orderService.updateOrderAdmin(
      id,
      user,
      updateOrderDto,
      userId
    );
  }

  @ApiBearerAuth()
  @Delete("/delete/:id")
  @UseGuards(AuthGuard("jwt"))
  async deleteOrder(
    @Param("id") id: String,
    @GetUser()
    user: User
  ): Promise<any> {
    return await this.orderService.deleteOrderAdmin(id, user);
  }

  @ApiBearerAuth()
  @Get("/find")
  @UseGuards(AuthGuard("jwt"))
  async getAllOrder(
    @GetUser()
    user: User
  ): Promise<any> {
    return await this.orderService.getAllOrderAdmin(user);
  }
}
