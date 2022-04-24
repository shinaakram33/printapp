import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { CategoryTypes } from "../../products/products.model";
import { ApiProperty } from "@nestjs/swagger";

class Category {
  @ApiProperty()
  name: String;

  @ApiProperty()
  pricePerHunderd: String;

  @ApiProperty()
  description: String;

  @ApiProperty()
  paperType: String;

  @ApiProperty()
  leadTime: String;

  @ApiProperty()
  colour: String;

  @ApiProperty()
  sizes: String;
}

class Size {
  @ApiProperty()
  name: String;

  @ApiProperty()
  description: String;
}

class PriceChart {
  @ApiProperty()
  quantity: String;

  @ApiProperty()
  unitPrice: String;
}

class NumberOfPages {
  @ApiProperty()
  pageName?: String;

  @ApiProperty()
  number?: number;
}

class Corner {
  @ApiProperty()
  cornerName?: String;

  @ApiProperty()
  cornerDescription?: String;
}

class Cut {
  @ApiProperty()
  cutName?: String;

  @ApiProperty()
  cutDescription?: String;
}

class Window {
  @ApiProperty()
  windowName?: String;

  @ApiProperty()
  windowDescription?: String;
}

class Folding {
  @ApiProperty()
  foldingName?: String;

  @ApiProperty()
  foldingDescription?: String;
}
export class CartAddItemDto {
  @ApiProperty()
  @IsNotEmpty()
  image: [];

  @ApiProperty()
  @IsEnum(CategoryTypes)
  @IsNotEmpty()
  title: CategoryTypes;

  @ApiProperty()
  @IsNotEmpty()
  category: Category;

  @ApiProperty()
  @IsNotEmpty()
  size: Size;

  @ApiProperty()
  @IsNotEmpty()
  priceChart: PriceChart;

  @ApiProperty()
  @IsNotEmpty()
  preview: Boolean;

  @ApiProperty()
  @IsNotEmpty()
  designUrl: String;

  @ApiProperty()
  @IsNotEmpty()
  remarks: String;

  @ApiProperty()
  @IsOptional()
  numberOfPages?: NumberOfPages;

  @ApiProperty()
  @IsOptional()
  corner?: Corner;

  @ApiProperty()
  @IsOptional()
  cut?: Cut;

  @ApiProperty()
  @IsOptional()
  window?: Window;

  @ApiProperty()
  @IsOptional()
  folding?: Folding;

  @ApiProperty()
  @IsOptional()
  paperType?: String[];

  @ApiProperty()
  @IsOptional()
  spotUV?: String[];

  @ApiProperty()
  @IsOptional()
  finishing?: String[];

  @ApiProperty()
  @IsOptional()
  numberOfSides?: String;
}
