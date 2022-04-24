import { CategoryTypes } from "../products.model";
import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import Api from "twilio/lib/rest/Api";
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

class Size {
  @ApiProperty()
  name?: String;

  @ApiProperty()
  description?: String;
}

class PriceChart {
  @ApiProperty()
  quantity?: String;

  @ApiProperty()
  unitPrice?: String;
}

export class UpdateProductDto {
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
  priceChart?: PriceChart[];

  @ApiProperty()
  @IsOptional()
  preview?: Boolean;

  @ApiProperty()
  @IsOptional()
  designUrl?: String;

  @ApiProperty()
  @IsOptional()
  remarks?: String;

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
  numberOfSides?: String[];
}
