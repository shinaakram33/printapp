import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateActivityDto {
  @IsOptional()
  @ApiProperty()
  isRead: Boolean;
}
