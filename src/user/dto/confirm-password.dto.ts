import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class ConfirmPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
