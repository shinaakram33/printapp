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
      appId: "041fb0c4-d5be-4a35-bcde-68e3be50d503",
      restApiKey: "NjEwNTRkMzgtYmEwMi00ZDJhLTg0ZDAtMzcwZGM0Y2ViYjE5",
    }),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
