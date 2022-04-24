import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/products.model";

export class CreateCartDto {
  @ApiProperty()
  @IsNotEmpty()
  products: Product[];

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  subTotal: number;

  @ApiProperty()
  @IsNotEmpty()
  discount: number;

  @ApiProperty()
  @IsNotEmpty()
  deliveryCharges: number;

  @ApiProperty()
  @IsNotEmpty()
  total: number;
}
