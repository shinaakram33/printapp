import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsUUID("4")
  _id: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsUUID("4")
  to: string;

  @IsNotEmpty()
  @IsUUID("4")
  from: string;
}
