import { IsOptional } from "class-validator";
export class UpdateHomeSliderDto {
  @IsOptional()
  image: string;

  @IsOptional()
  caption: string;
}
