import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyPinDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  otp: String;
}
