import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { orderStatus } from "../order.model";

export class UpdateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  status: orderStatus;
}
