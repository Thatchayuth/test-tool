import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductContController } from './ProductCont.controller';
import { ProductContService } from './ProductCont.service';
import { ProductEntity } from './Product.entity';
import { ProductTypeEntity } from './ProductType.entity';
import { StockTransactionEntity } from './StockTransaction.entity';
import { StockEntity } from './Stock.entity';
import { WarehouseEntity } from './Warehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProductEntity
    ,ProductTypeEntity
    ,StockTransactionEntity
    ,StockEntity
    ,WarehouseEntity
  ])],
  providers: [ProductContService],
  controllers: [ProductContController]
})
export class ProductContModule { }
