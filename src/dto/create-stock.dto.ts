import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  warehouseId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  costPrice: number;

  @IsNumber()
  sellingPrice: number;
}
