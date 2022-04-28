import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { CategoryTypes } from "../products.model";
import { ApiProperty } from "@nestjs/swagger";

class Category {
  @ApiProperty()
  @IsNotEmpty()
  name: String;

  @ApiProperty()
  @IsNotEmpty()
  pricePerHunderd: String;

  @ApiProperty()
  @IsNotEmpty()
  productType: String;

  @ApiProperty()
  @IsNotEmpty()
  description: String;

  @ApiProperty()
  @IsNotEmpty()
  paperType: String;

  @ApiProperty()
  @IsNotEmpty()
  leadTime: String;

  @ApiProperty()
  @IsNotEmpty()
  colour: String;

  @ApiProperty()
  @IsNotEmpty()
  sizes: String;
}

class Size {
  @ApiProperty()
  @IsNotEmpty()
  name: String;

  @ApiProperty()
  @IsOptional()
  height: String;

  @ApiProperty()
  @IsOptional()
  width: String;

  @ApiProperty()
  @IsOptional()
  image: String;
}

class PriceChart {
  @ApiProperty()
  @IsNotEmpty()
  quantity: String;

  @IsNotEmpty()
  @ApiProperty()
  unitPrice: String;
}

class NumberOfPages {
  @IsNotEmpty()
  @ApiProperty()
  pageName?: String;

  @IsNotEmpty()
  @ApiProperty()
  number?: number[];
}

class Corner {
  @IsNotEmpty()
  @ApiProperty()
  cornerName?: String;

  @IsNotEmpty()
  @ApiProperty()
  cornerDescription?: String;
}

class Cut {
  @ApiProperty()
  @IsNotEmpty()
  cutName?: String;

  @ApiProperty()
  @IsNotEmpty()
  cutHeight?: String;

  @ApiProperty()
  @IsNotEmpty()
  cutWidth?: String;
}

class Window {
  @ApiProperty()
  @IsNotEmpty()
  windowName?: String;

  @ApiProperty()
  @IsNotEmpty()
  windowHeight?: String;

  @ApiProperty()
  @IsNotEmpty()
  windowWidth?: String;
}

class Folding {
  @ApiProperty()
  @IsNotEmpty()
  foldingName?: String;

  @ApiProperty()
  @IsNotEmpty()
  foldingHeight?: String;

  @ApiProperty()
  @IsNotEmpty()
  foldingWidth?: String;
}
export class AddProductDto {
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
  feature1: String;

  @ApiProperty()
  @IsNotEmpty()
  feature2: String;

  @ApiProperty()
  @IsNotEmpty()
  size: Size[];

  @ApiProperty()
  @IsNotEmpty()
  priceChart: PriceChart[];

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
  numberOfPages?: NumberOfPages[];

  @ApiProperty()
  @IsOptional()
  corner?: Corner[];

  @ApiProperty()
  @IsOptional()
  cut?: Cut[];

  @ApiProperty()
  @IsOptional()
  window?: Window[];

  @ApiProperty()
  @IsOptional()
  folding?: Folding[];

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
  numberOfSides?: String[];
}
