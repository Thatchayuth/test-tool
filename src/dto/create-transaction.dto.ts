import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { TransactionType } from 'src/Product/StockTransaction.entity';


export class CreateTransactionDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  warehouseId: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  quantity: number;

  @IsOptional()
  reference?: string;
}
