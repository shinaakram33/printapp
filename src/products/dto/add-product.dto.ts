import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { CategoryTypes } from "../products.model";
export class AddProductDto {
  @IsNotEmpty()
  image: [];

  @IsEnum(CategoryTypes)
  @IsNotEmpty()
  title: CategoryTypes;

  @IsNotEmpty()
  category: {
    name: String;
    pricePerHunderd: String;
    description: String;
    paperType: String;
    leadTime: String;
    colour: String;
    sizes: String;
  };
  @IsNotEmpty()
  size: {
    name: String;
    description: String;
  };
  @IsNotEmpty()
  priceChart: [
    {
      quantity: String;
      unitPrice: String;
    }
  ];
  @IsNotEmpty()
  preview: Boolean;

  @IsNotEmpty()
  designUrl: String;

  @IsNotEmpty()
  remarks: String;

  @IsOptional()
  numberOfPages?: {
    pageName?: String;
    number?: number;
  };

  @IsOptional()
  corner?: {
    cornerName?: String;
    cornerDescription?: String;
  };

  @IsOptional()
  cut?: {
    cutName?: String;
    cutDescription?: String;
  };

  @IsOptional()
  window?: {
    windowName?: String;
    windowDescription?: String;
  };

  @IsOptional()
  paperType?: String[];

  @IsOptional()
  spotUV?: String[];

  @IsOptional()
  finishing?: String[];

  @IsOptional()
  numberOfSides?: String[];
}
