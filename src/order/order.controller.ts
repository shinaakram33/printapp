import { Body, Controller, Delete, Get, Patch, Post, Param, UseGuards, UnauthorizedException } from '@nestjs/common';
import { GetUser } from 'src/user/auth/get-user.decorator';
import { User } from '../user/user.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AddOrderDto } from './dto/add-order.dto';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import CreateChargeDto from './dto/createCharge.dto';
import { StripeService } from '../stripe/stripe.service';

@Controller('order')
@ApiTags('Order Controller')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly stripeService: StripeService) {}

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserOrders(@GetUser() user: User) {
    return this.orderService.getAllUserOrders(user);
  }

  @ApiBearerAuth()
  @Post('/charge')
  @UseGuards(AuthGuard('jwt'))
  async createCharge(@Body() charge: CreateChargeDto, @GetUser() user: User) {
    return await this.stripeService.charge(charge.amount, charge.paymentMethodId, user);
  }

  @ApiBearerAuth()
  @Post('/add')
  @UseGuards(AuthGuard('jwt'))
  async addOrder(@GetUser() user: User, @Body() addOrderDto: AddOrderDto): Promise<any> {
    return await this.orderService.addOrder(user, addOrderDto);
  }

  @ApiBearerAuth()
  @Post('/admin/add/:userId')
  @UseGuards(AuthGuard('jwt'))
  async addOrderAdmin(@GetUser() user: User, @Body() addOrderDto: AddOrderDto, @Param('userId') userId: string): Promise<any> {
    return await this.orderService.addOrderAdmin(user, addOrderDto, userId);
  }

  @ApiBearerAuth()
  @Patch('/update/:userId/:orderId')
  @UseGuards(AuthGuard('jwt'))
  async updateOrder(
    @Param('orderId') orderId: string,
    @Param('userId') userId: string,
    @GetUser()
    user: User,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<any> {
    return await this.orderService.updateOrderAdmin(orderId, user, updateOrderDto, userId);
  }

  @ApiBearerAuth()
  @Delete('/delete/:orderId')
  @UseGuards(AuthGuard('jwt'))
  async deleteOrder(
    @Param('orderId') orderId: String,
    @GetUser()
    user: User
  ): Promise<any> {
    return await this.orderService.deleteOrderAdmin(orderId, user);
  }

  @ApiBearerAuth()
  @Get('/admin/findall')
  @UseGuards(AuthGuard('jwt'))
  async getAllOrder(@GetUser() user: User): Promise<any> {
    if (user.role !== 'ADMIN') throw new UnauthorizedException('You dont have authorization to access this route');
    return await this.orderService.getAllOrderAdmin(user);
  }

  @ApiBearerAuth()
  @Get('/find/:orderId')
  @UseGuards(AuthGuard('jwt'))
  async getOrder(@GetUser() user: User, @Param('orderId') orderId: String): Promise<any> {
    return await this.orderService.getOrderAdmin(user, orderId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/admin/:userId')
  async getUserPreviousOrders(@GetUser() user: User, @Param('userId') userId: string): Promise<any> {
    if (user.role !== 'ADMIN') return new UnauthorizedException('User has no access');
    return this.orderService.getUserPreviousOrders(userId);
  }

  // @ApiBearerAuth()
  @Post('/support/:referenceNumber/:isInvoie')
  // @UseGuards(AuthGuard('jwt'))
  async orderSupport(@Param('referenceNumber') referenceNumber:string, @GetUser() user: User, @Param('isInvoie') isInvoie:string ){
    return this.orderService.postSupportEmail(user, referenceNumber, isInvoie);
  }
}
