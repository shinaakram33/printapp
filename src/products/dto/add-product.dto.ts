import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { CategoryTypes } from "../products.model";
import { ApiProperty } from "@nestjs/swagger";

class Category {
  @ApiProperty()
  name: String;

  @ApiProperty()
  pricePerHunderd: String;

  @ApiProperty()
  productType: String;

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
  height: String;

  @ApiProperty()
  width: String;
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
  number?: number[];
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
  cutHeight?: String;

  @ApiProperty()
  cutWidth?: String;
}

class Window {
  @ApiProperty()
  windowName?: String;

  @ApiProperty()
  windowHeight?: String;

  @ApiProperty()
  windowWidth?: String;
}

class Folding {
  @ApiProperty()
  foldingName?: String;

  @ApiProperty()
  foldingHeight?: String;

  @ApiProperty()
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
