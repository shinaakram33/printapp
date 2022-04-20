import { IsNotEmpty } from "class-validator";
export class AddHomeSliderDto {
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  caption: string;
}
