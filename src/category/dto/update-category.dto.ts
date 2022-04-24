import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateCategoryDto {
  @ApiProperty()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsOptional()
  deliveryTime: string;

  @ApiProperty()
  @IsOptional()
  priceDescription: string;

  @ApiProperty()
  @IsOptional()
  category: string;
}
