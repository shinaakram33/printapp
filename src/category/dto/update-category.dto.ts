import { IsOptional } from "class-validator";

export class UpdateCategoryDto {
  @IsOptional()
  image: string;

  @IsOptional()
  title: string;

  @IsOptional()
  deliveryTime: string;

  @IsOptional()
  priceDescription: string;

  @IsOptional()
  category: string;
}
