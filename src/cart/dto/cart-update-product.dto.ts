import { CategoryTypes } from "../../products/products.model";
import { IsOptional, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
class Category {
  @ApiProperty()
  name?: String;

  @ApiProperty()
  pricePerHunderd?: String;

  @ApiProperty()
  description?: String;

  @ApiProperty()
  paperType?: String;

  @ApiProperty()
  leadTime?: String;

  @ApiProperty()
  colour?: String;

  @ApiProperty()
  sizes?: String;
}

class NumberOfPages {
  @ApiProperty()
  pageName?: String;

  @ApiProperty()
  number?: String;
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

class Size {
  @ApiProperty()
  name?: String;

  @ApiProperty()
  height?: String;

  @ApiProperty()
  Width?: String;
}

class PriceChart {
  @ApiProperty()
  quantity?: String;

  @ApiProperty()
  unitPrice?: String;
}

export class CartUpdateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsOptional()
  title?: CategoryTypes;

  @ApiProperty()
  @IsOptional()
  category?: Category;

  @ApiProperty()
  @IsOptional()
  size?: Size;

  @ApiProperty()
  @IsOptional()
  priceChart?: PriceChart;

  @ApiProperty()
  @IsOptional()
  preview?: Boolean;

  @ApiProperty()
  @IsOptional()
  designUrl?: String;

  @ApiProperty()
  @IsOptional()
  designFileUrl?: String;


  @ApiProperty()
  @IsOptional()
  remarks?: String;

  @ApiProperty()
  @IsOptional()
  feature1?: String;

  @ApiProperty()
  @IsOptional()
  feature2?: String;

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
  paperType?: String;

  @ApiProperty()
  @IsOptional()
  spotUV?: String;

  @ApiProperty()
  @IsOptional()
  finishing?: String;

  @ApiProperty()
  @IsOptional()
  numberOfSides?: String;

  @IsOptional()
  @ApiProperty()
  sendByMail: boolean;
}
