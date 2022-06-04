import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { JwtStrategy } from './auth/jwt.strategy';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [
    StripeModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get('JWT_SECRET_KEY');
        const expiresIn = configService.get('JWT_EXPIRATION_TIME');
        return { secret, signOptions: (expiresIn && { expiresIn }) || {} };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, ConfigService],
  exports: [JwtStrategy, PassportModule, UserService],
})
export class UserModule {}
