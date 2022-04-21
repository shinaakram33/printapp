import { IsNotEmpty, IsOptional } from "class-validator";

export class AddAddressDto {
  @IsNotEmpty()
  fullName: String;

  @IsOptional()
  companyName: String;

  @IsNotEmpty()
  addressLine1: String;

  @IsNotEmpty()
  addressLine2: String;

  @IsNotEmpty()
  area: String;

  @IsNotEmpty()
  district: String;

  @IsNotEmpty()
  cityCountry: String;

  @IsNotEmpty()
  contactNumber: String;
}
