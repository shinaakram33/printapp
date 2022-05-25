import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ResetPasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  pin: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  confirmPassword: string;
}
