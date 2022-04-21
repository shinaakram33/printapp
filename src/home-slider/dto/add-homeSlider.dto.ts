import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class AddHomeSliderDto {
  @ApiProperty()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  caption: string;
}
