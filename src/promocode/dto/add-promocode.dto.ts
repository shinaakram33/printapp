import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryTypes } from "src/products/products.model";
import { PromoTypes } from "../promocode.model";

class PromoType {
  @ApiProperty()
  @IsNotEmpty()
  name: String;

  @IsNotEmpty()
  @ApiProperty()
  type: PromoTypes;
}
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

  @IsNotEmpty()
  @ApiProperty()
  date: String;

  @IsNotEmpty()
  @ApiProperty()
  type: PromoType;
}
