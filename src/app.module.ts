import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { ProductsModule } from './products/products.module';
import { HomeSliderModule } from './home-slider/home-slider.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { PriceChartModule } from './priceChart/pricechart.module';
import { StripeModule } from './stripe/stripe.module';
import { PromocodeModule } from './promocode/promocode.module';
import { NotificationModule } from './notification/notification.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ useFactory: () => ({ uri: process.env.DB_URL }) }),
    UserModule,
    CategoryModule,
    UploadFileModule,
    ProductsModule,
    HomeSliderModule,
    OrderModule,
    CartModule,
    PriceChartModule,
    StripeModule,
    PromocodeModule,
    ActivityModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
