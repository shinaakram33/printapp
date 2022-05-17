import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddCardDto {
  @ApiProperty()
  @IsNotEmpty()
  cardNumber: String;

  @ApiProperty()
  @IsNotEmpty()
  expiry: String;

  @ApiProperty()
  @IsNotEmpty()
  cvv: String;
}
