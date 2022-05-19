import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.model";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./auth/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StripeModule } from "src/stripe/stripe.module";
@Module({
  imports: [
    StripeModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: "jwt" }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get("JWT_SECRET_KEY"),
          signOptions: {
            ...(configService.get("JWT_EXPIRATION_TIME")
              ? {
                  expiresIn: Number(configService.get("JWT_EXPIRATION_TIME")),
                }
              : {}),
          },
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, ConfigService],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
