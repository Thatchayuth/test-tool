import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  typeId: number; // FK -> ProductType
}
