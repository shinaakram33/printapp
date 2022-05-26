import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ResetPasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  confirmPassword: string;
}
