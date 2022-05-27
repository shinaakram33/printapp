import { CategoryTypes } from "../products.model";
import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
class Category {
  @ApiProperty()
  @IsOptional()
  name?: String;

  @ApiProperty()
  @IsOptional()
  pricePerHunderd?: String;

  @ApiProperty()
  @IsOptional()
  description?: String;

  @ApiProperty()
  @IsOptional()
  paperType?: String;

  @ApiProperty()
  @IsOptional()
  leadTime?: String;

  @ApiProperty()
  @IsOptional()
  colour?: String;

  @ApiProperty()
  @IsOptional()
  sizes?: String;
}

// class NumberOfPages {
//   @ApiProperty()
//   @IsOptional()
//   pageName?: String;

//   @ApiProperty()
//   @IsOptional()
//   number?: String[];
// }

// class Corner {
//   @ApiProperty()
//   @IsOptional()
//   cornerName?: String;

//   @ApiProperty()
//   @IsOptional()
//   cornerDescription?: String;
// }

// class Cut {
//   @ApiProperty()
//   @IsOptional()
//   cutName?: String;

//   @ApiProperty()
//   @IsOptional()
//   cutHeight?: String;

//   @ApiProperty()
//   @IsOptional()
//   cutWidth?: String;
// }

// class Window {
//   @ApiProperty()
//   @IsOptional()
//   windowName?: String;

//   @ApiProperty()
//   @IsOptional()
//   windowHeight?: String;

//   @ApiProperty()
//   @IsOptional()
//   windowWidth?: String;
// }

// class Folding {
//   @ApiProperty()
//   @IsOptional()
//   foldingName?: String;

//   @ApiProperty()
//   @IsOptional()
//   foldingHeight?: String;

//   @ApiProperty()
//   @IsOptional()
//   foldingWidth?: String;
// }

// class Size {
//   @ApiProperty()
//   @IsOptional()
//   name?: String;

//   @ApiProperty()
//   @IsOptional()
//   height?: String;

//   @ApiProperty()
//   @IsOptional()
//   Width?: String;

//   @ApiProperty()
//   @IsOptional()
//   image?: String;
// }

// class PriceChart {
//   @ApiProperty()
//   @IsOptional()
//   quantity?: String;

//   @ApiProperty()
//   @IsOptional()
//   unitPrice?: String;
// }

export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  image: string[];

  @ApiProperty()
  @IsOptional()
  title?: CategoryTypes;

  @ApiProperty()
  @IsOptional()
  category?: Category;

  // @ApiProperty()
  // @IsOptional()
  // size?: Size[];

  // @ApiProperty()
  // @IsOptional()
  // priceChart?: PriceChart[];

  // @ApiProperty()
  // @IsOptional()
  // preview?: Boolean;

  // @ApiProperty()
  // @IsOptional()
  // designUrl?: String;

  // @ApiProperty()
  // @IsOptional()
  // remarks?: String;

  @ApiProperty()
  @IsOptional()
  feature1?: String;

  @ApiProperty()
  @IsOptional()
  feature2?: String;

  // @ApiProperty()
  // @IsOptional()
  // numberOfPages?: NumberOfPages[];

  // @ApiProperty()
  // @IsOptional()
  // corner?: Corner[];

  // @ApiProperty()
  // @IsOptional()
  // cut?: Cut[];

  // @ApiProperty()
  // @IsOptional()
  // window?: Window[];

  // @ApiProperty()
  // @IsOptional()
  // folding?: Folding[];

  // @ApiProperty()
  // @IsOptional()
  // paperType?: String[];

  // @ApiProperty()
  // @IsOptional()
  // spotUV?: String[];

  // @ApiProperty()
  // @IsOptional()
  // finishing?: String[];

  // @ApiProperty()
  // @IsOptional()
  // numberOfSides?: String[];

  @ApiProperty()
  @IsOptional()
  status: String;
}
