import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryTypes } from "src/products/products.model";

export class AddPromocodeDto {
  @IsNotEmpty()
  @ApiProperty()
  name: String;

  @IsNotEmpty()
  @ApiProperty()
  category: CategoryTypes;

  @IsNotEmpty()
  @ApiProperty()
  status: String;

  @IsNotEmpty()
  @ApiProperty()
  discount: String;

  @IsNotEmpty()
  @ApiProperty()
  noOfTimesUsed: Number;
}
