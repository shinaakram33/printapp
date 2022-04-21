import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateHomeSliderDto {
  @ApiProperty()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsOptional()
  caption: string;
}
