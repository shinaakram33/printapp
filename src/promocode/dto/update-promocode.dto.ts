import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryTypes } from "src/products/products.model";

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
}
