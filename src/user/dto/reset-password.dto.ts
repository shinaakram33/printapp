import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsNumber()
  pin: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
