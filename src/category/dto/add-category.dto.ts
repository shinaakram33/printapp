import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class AddCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  deliveryTime: string;

  @ApiProperty()
  @IsNotEmpty()
  priceDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  category: string;
}
