import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { orderStatus } from "../order.model";
import { CategoryTypes } from "src/products/products.model";

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

export class Address {
  @ApiProperty()
  @IsNotEmpty()
  fullName: String;

  @ApiProperty()
  @IsOptional()
  companyName: String;

  @ApiProperty()
  @IsNotEmpty()
  addressLine1: String;

  @ApiProperty()
  @IsNotEmpty()
  addressLine2: String;

  @ApiProperty()
  @IsNotEmpty()
  area: String;

  @ApiProperty()
  @IsNotEmpty()
  district: String;

  @ApiProperty()
  @IsNotEmpty()
  cityCountry: String;

  @ApiProperty()
  @IsNotEmpty()
  contactNumber: String;

  @ApiProperty()
  @IsOptional()
  primary: Boolean;
}
class Product {
  @ApiProperty()
  @IsOptional()
  image: String;

  @ApiProperty()
  @IsEnum(CategoryTypes)
  @IsOptional()
  title: CategoryTypes;

  @ApiProperty()
  @IsOptional()
  category: Category;

  @ApiProperty()
  @IsNotEmpty()
  size: Size;

  @ApiProperty()
  @IsOptional()
  priceChart: PriceChart;

  @ApiProperty()
  @IsOptional()
  preview: Boolean;

  @ApiProperty()
  @IsOptional()
  designUrl: String[];

  @ApiProperty()
  @IsOptional()
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
}

export class AddOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  products: Product[];

  @ApiProperty()
  @IsNotEmpty()
  orderDate: String;

  @ApiProperty()
  @IsNotEmpty()
  deliveryMethod: String;

  @ApiProperty()
  @IsNotEmpty()
  deliveryAddress: Address;

  @ApiProperty()
  @IsNotEmpty()
  paymentMethod: String;

  @ApiProperty()
  @IsNotEmpty()
  subTotal: Number;

  @ApiProperty()
  @IsNotEmpty()
  discount: Number;

  @IsNotEmpty()
  @ApiProperty()
  total: Number;

  @IsNotEmpty()
  @ApiProperty()
  status: orderStatus;

  @IsOptional()
  @ApiProperty()
  deliveryCost: number;
}
