import * as moment from 'moment';
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, orderDocument, orderStatus } from './order.model';
import { User } from '../user/user.model';
import { AddOrderDto } from './dto/add-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NotificationService } from 'src/notification/notification.service';
import { SendgridService } from 'src/sendgrid.module';
import { CodeBuild } from 'aws-sdk';
import { Promocode, PromocodeDocument } from 'src/promocode/promocode.model';

@Injectable()
export class OrderService {
  private logger = new Logger();
  constructor(
    @InjectModel(Order.name) private orderModel: Model<orderDocument>,
    @InjectModel(Promocode.name)
    private promoCodeModel: Model<PromocodeDocument>,
    private notificationService: NotificationService,
    private sendgridService: SendgridService
  ) {}

  private sendEmail(to: string, subject: string, text: string): Promise<void> {
    return this.sendgridService.sendMail({ to, subject, text});
  }

  async postSupportEmail(user: User, referenceNumber: string, isInvoie: string) {
    await Promise.all(
      isInvoie === 'true'
        ? [
            this.sendEmail(
              'admin@printprint.com.hk',
              `Invoice request: [${referenceNumber}]`,
              `The client has requested an invoice to be e-mailed to them.
    `
            ),
          ]
        : [
            this.sendEmail(
              'admin@printprint.com.hk',
              `Order support request: [${referenceNumber}]`,
              `The client has requested support for the order.`
            ),
          ]
    );

    return 'Email Sent to the admin';
  }

  async getAllUserOrders(user: User) {
    return this.orderModel.find({ userId: user._id });
  }

  async addOrder(user: User, addOrderDto: AddOrderDto): Promise<any> {
    try {
      const currentDate = new Date();
      let refrenceId='';
      const getLastOrder = await this.orderModel.find({}).sort({createdAt:-1}).limit(1);
      
      const currentDateMonth = moment(new Date()).format('MM');
      const currentDateYear = moment(new Date()).format('YYYY');

      if(getLastOrder.length>0){
        const getLastOrderDate = getLastOrder[0].createdAt;
        const month = moment(getLastOrderDate).format('MM');  
        const orderRefrence = getLastOrder[0].orderRefrence;
        const count = orderRefrence.split('-');
        let countInNumber = parseInt(count[1]);
        if(currentDateMonth == month){
         const newOrderRefrenceCount = countInNumber+1;
          refrenceId = `PP${currentDateYear}${currentDateMonth}-${newOrderRefrenceCount}`
        }
        else{
          refrenceId = `PP${currentDateYear}${currentDateMonth}-1041`;
        }
      }
      else{
         refrenceId = `PP${currentDateYear}${currentDateMonth}-1041`;
      }
     

      const order = await this.orderModel.create({
        userId: user._id,
        createdBy: user._id,
        orderRefrence: refrenceId,
        ...addOrderDto,
      });

      if(addOrderDto.promoCodeApplied){
        const updatePromoCodeCount = await this.promoCodeModel.findOneAndUpdate(
          { _id: addOrderDto.promoCodeId },
          { $inc: { noOfTimeUsed: 1 } },
          { new: true}
        )
      }
      // const DesignUrl = order.products.map((item, index)=>{item.designUrl});
      // const DesignUrl = order.products.flat()
      // const DesignFileUrl = order.products.map((item, index)=>{
      //   const data1 = {
      //     "productName": item.category.name,
      //     "Product Category" : item.title,
      //     "Product Design Url": item.designUrl,
      //     "Product Design File Url": item.designFileUrl
      //   }
      //   return data1;
      // });
      // console.log("desssss", DesignFileUrl)

      await Promise.all( [
              this.sendEmail(
                user.email,
                'Order Detail',
                `Order ${order.orderRefrence} was created by ${user.firstName} having order subTotal=${order.subTotal} and amount=${order.total}.Order has payment method is ${order.paymentMethod}.`
              ),
            ]
      );
      await Promise.all( [
        this.sendEmail(
          'admin@printprint.com.hk',
          'Order Detail',
          `Order ${order.orderRefrence} was created by ${user.firstName} having order subTotal=${order.subTotal} and amount=${order.total}.Order has payment method is ${order.paymentMethod}.`
        ),
      ]);
      const notification = await this.notificationService.generateNotification(
        `Order ${order.orderRefrence} was created`,
        user._id.toString(),
        order.status,
        order._id
      );
      return order;
    } catch (error) {
      this.logger.log('Add Order failed', error);
      throw new BadRequestException(error.message);
    }
  }

  //for admin
  async addOrderAdmin(user: User, addOrderDto: AddOrderDto, userId: string): Promise<any> {
    try {
      if (!user || user.role == 'USER') {
        throw new UnauthorizedException('You are not authorize to perform this operation.');
      } else {

        const currentDate = new Date();
      let refrenceId='';
      const getLastOrder = await this.orderModel.find({}).sort({createdAt:-1}).limit(1);
      
      const currentDateMonth = moment(new Date()).format('MM');
      const currentDateYear = moment(new Date()).format('YYYY');

      if(getLastOrder.length>0){
        const getLastOrderDate = getLastOrder[0].createdAt;
        const month = moment(getLastOrderDate).format('MM');  
        const orderRefrence = getLastOrder[0].orderRefrence;
        const count = orderRefrence.split('-');
        let countInNumber = parseInt(count[1]);
        if(currentDateMonth == month){
         const newOrderRefrenceCount = countInNumber+1;
          refrenceId = `PP${currentDateYear}${currentDateMonth}-${newOrderRefrenceCount}`
        }
        else{
          refrenceId = `PP${currentDateYear}${currentDateMonth}-1041`;
        }
      }
      else{
         refrenceId = `PP${currentDateYear}${currentDateMonth}-1041`;
      }
     



        const order = await this.orderModel.create({
          userId: userId,
          createdBy: user._id,
          orderRefrence: refrenceId,
          ...addOrderDto,
        });
        const notification =
          await this.notificationService.generateNotification(
            `Order ${order.orderRefrence} has been changed to ${order.status}`,
            userId,
            order.status,
            order._id
          );
        return order;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOrderAdmin(id: string, user: User, updateOrderDto: UpdateOrderDto, userId: string): Promise<any> {
    try {
      if (!user || user.role == 'USER') {
        throw new UnauthorizedException('You are not authorize to perform this operation.');
      } else {
        const order = await this.orderModel.findOneAndUpdate({_id: id},updateOrderDto, { new: true });

        const notification = await this.notificationService.generateNotification(
          `Order ${order.orderRefrence} has been changed to ${order.status}`,
          userId,
          order.status,
          order._id
        );
        return order;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteOrderAdmin(id: String, user: User): Promise<any> {
    try {
      if (!user || user.role == 'USER') {
        throw new UnauthorizedException('You are not authorize to perform this operation.');
      } else {
        return await this.orderModel.findByIdAndDelete(id);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllOrderAdmin(user: User): Promise<any> {
    try {
      if (!user || user.role == 'USER') {
        throw new UnauthorizedException('You are not authorize to perform this operation.');
      } else {
        return await this.orderModel.find().populate('createdBy userId');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOrderAdmin(user: User, orderId: String): Promise<any> {
    try {
      if (!user || user.role == 'USER') {
        throw new UnauthorizedException('You are not authorize to perform this operation.');
      } else {
        return await this.orderModel.findById(orderId);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserPreviousOrders(userId: string): Promise<any> {
    return this.orderModel
      .find({ userId, status: { $in: [orderStatus.COMPLETED, orderStatus.CANCELLED] } })
      .populate('createdBy userId');
  }

  async test() {
    return this.orderModel.find()
  }
}
