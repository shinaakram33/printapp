import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCardDto {
  @ApiProperty()
  @IsOptional()
  cardNumber: String;

  @ApiProperty()
  @IsOptional()
  expiry: String;

  @ApiProperty()
  @IsOptional()
  cvv: String;
}
