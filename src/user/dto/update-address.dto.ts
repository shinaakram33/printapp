import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAddressDto {
  @ApiProperty()
  @IsOptional()
  fullName: String;

  @ApiProperty()
  @IsOptional()
  companyName: String;

  @ApiProperty()
  @IsOptional()
  addressLine1: String;

  @ApiProperty()
  @IsOptional()
  addressLine2: String;

  @ApiProperty()
  @IsOptional()
  area: String;

  @ApiProperty()
  @IsOptional()
  district: String;

  @ApiProperty()
  @IsOptional()
  cityCountry: String;

  @ApiProperty()
  @IsOptional()
  contactNumber: String;

  @ApiProperty()
  @IsOptional()
  primary: Boolean;
}
