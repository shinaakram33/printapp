import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { orderStatus } from "../order.model";
import { Address } from "src/user/user.model";

export class UpdateOrderDto {
  @ApiProperty()
  @IsOptional()
  status: orderStatus;

  @IsNotEmpty()
  @IsOptional()
  orderDate: String;

  @IsNotEmpty()
  @IsOptional()
  deliveryMethod: String;

  @IsNotEmpty()
  @IsOptional()
  deliveryAddress: Address;

  @IsNotEmpty()
  @IsOptional()
  paymentMethod: String;

  @IsNotEmpty()
  @IsOptional()
  subTotal: number;

  @IsNotEmpty()
  @IsOptional()
  discount: number;

  @IsNotEmpty()
  @IsOptional()
  total: number;
}
