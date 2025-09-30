import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductContService } from './ProductCont.service';
import { CreateTransactionDto } from 'src/dto/create-transaction.dto';
import { CreateStockDto } from 'src/dto/create-stock.dto';
import { CreateProductDto } from 'src/dto/create-product.dto';


@Controller('rest/ProductCont')
export class ProductContController {

  constructor(private service: ProductContService) { }


  @Post('product')
  createProduct(@Body() dto: CreateProductDto) {
    return this.service.createProduct(dto);
  }

  @Post('init')
  createStock(@Body() dto: CreateStockDto) {
    return this.service.createStock(dto);
  }

  @Post('transaction')
  createTransaction(@Body() dto: CreateTransactionDto) {
    return this.service.createTransaction(dto);
  }

  @Get('product/:id')
  getStockByProduct(@Param('id') id: number) {
    return this.service.getStockByProduct(id);
  }

  @Get('transactions')
  getTransactions() {
    return this.service.getTransactions();
  }

}
