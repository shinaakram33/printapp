import { IsNotEmpty, IsString } from "class-validator";

export class AddStripeCardDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
}
