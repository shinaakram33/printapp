import { IsNotEmpty } from "class-validator";
export class AddCategoryDto {
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  deliveryTime: string;

  @IsNotEmpty()
  priceDescription: string;

  @IsNotEmpty()
  category: string;
}
