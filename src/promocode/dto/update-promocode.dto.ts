import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryTypes } from "src/products/products.model";
import { PromoTypes } from "../promocode.model";

class PromoType {
  @ApiProperty()
  @IsOptional()
  name: String;

  @IsNotEmpty()
  @IsOptional()
  type: PromoTypes;
}
export class UpdatePromocodeDto {
  @ApiProperty()
  @IsOptional()
  name: String;

  @ApiProperty()
  @IsOptional()
  status: String;

  @ApiProperty()
  @IsOptional()
  category: CategoryTypes;

  @ApiProperty()
  @IsOptional()
  discount: String;

  @ApiProperty()
  @IsOptional()
  noOfTimesUsed: Number;

  @IsOptional()
  @ApiProperty()
  date: String;

  @IsOptional()
  @ApiProperty()
  type: PromoType;
}
