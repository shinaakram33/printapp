import { IsNotEmpty } from "class-validator";
import { Product } from "src/products/products.model";
import { Address } from "../../user/user.model";

export class AddOrderDto {
  @IsNotEmpty()
  products: Product[];

  @IsNotEmpty()
  orderDate: String;

  @IsNotEmpty()
  deliveryMethod: String;

  @IsNotEmpty()
  deliveryAddress: Address;

  @IsNotEmpty()
  paymentMethod: String;

  @IsNotEmpty()
  subTotal: number;

  @IsNotEmpty()
  discount: number;

  @IsNotEmpty()
  total: number;
}
