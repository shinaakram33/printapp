import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { NotificationSchema, Notification } from "./notification.model";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { User, UserSchema } from "src/user/user.model";
import { OneSignalModule } from "onesignal-api-client-nest";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    OneSignalModule.forRoot({
      appId: "fe2ee0f0-84e5-4650-b18b-1ad055d48339",
      restApiKey: "ZGRkOTBiMzctMjk0Ny00Yzk1LWE1ZWMtODg0YmEwMGEyNjcy",
    }),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
