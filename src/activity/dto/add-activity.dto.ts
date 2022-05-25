import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryTypes } from "src/products/products.model";

export class AddActivityDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: String;

  @IsNotEmpty()
  @ApiProperty()
  message: String;
}
