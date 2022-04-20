import { CategoryTypes } from "../products.model";
import { IsOptional } from "class-validator";
interface Category {
  name?: String;
  pricePerHunderd?: String;
  description?: String;
  paperType?: String;
  leadTime?: String;
  colour?: String;
  sizes?: String;
}

interface NumberOfPages {
  pageName?: String;
  number?: number;
}

interface Corner {
  cornerName?: String;
  cornerDescription?: String;
}

interface Cut {
  cutName?: String;
  cutDescription?: String;
}

interface Window {
  windowName?: String;
  windowDescription?: String;
}

interface Size {
  name?: String;
  description?: String;
}

interface PriceChart {
  quantity?: String;
  unitPrice?: String;
}

export class UpdateProductDto {
  @IsOptional()
  image: string;

  @IsOptional()
  title?: CategoryTypes;

  @IsOptional()
  category?: Category;

  @IsOptional()
  size?: Size;

  @IsOptional()
  priceChart?: PriceChart[];

  @IsOptional()
  preview?: Boolean;

  @IsOptional()
  designUrl?: String;

  @IsOptional()
  remarks?: String;

  @IsOptional()
  numberOfPages?: NumberOfPages;

  @IsOptional()
  corner?: Corner;

  @IsOptional()
  cut?: Cut;

  @IsOptional()
  window?: Window;

  @IsOptional()
  paperType?: String[];

  @IsOptional()
  spotUV?: String[];

  @IsOptional()
  finishing?: String[];

  @IsOptional()
  numberOfSides?: String[];
}
