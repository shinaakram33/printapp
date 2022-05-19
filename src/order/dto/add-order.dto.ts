import { IsNotEmpty } from "class-validator";
import { Product } from "src/products/products.model";
import { Address } from "../../user/user.model";
import { ApiProperty } from "@nestjs/swagger";

export class AddOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  products: Product[];

  @IsNotEmpty()
  @ApiProperty()
  orderDate: String;

  @IsNotEmpty()
  @ApiProperty()
  deliveryMethod: String;

  @IsNotEmpty()
  @ApiProperty()
  deliveryAddress: Address;

  @IsNotEmpty()
  @ApiProperty()
  paymentMethod: String;

  @IsNotEmpty()
  @ApiProperty()
  subTotal: number;

  @IsNotEmpty()
  @ApiProperty()
  discount: number;

  @IsNotEmpty()
  @ApiProperty()
  total: number;
}
