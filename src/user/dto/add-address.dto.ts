import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: String;

  @ApiProperty()
  @IsOptional()
  companyName: String;

  @ApiProperty()
  @IsNotEmpty()
  addressLine1: String;

  @ApiProperty()
  @IsNotEmpty()
  addressLine2: String;

  @ApiProperty()
  @IsNotEmpty()
  area: String;

  @ApiProperty()
  @IsNotEmpty()
  district: String;

  @ApiProperty()
  @IsNotEmpty()
  cityCountry: String;

  @ApiProperty()
  @IsNotEmpty()
  contactNumber: String;
}
