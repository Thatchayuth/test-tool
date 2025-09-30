import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './Product.entity';
import { Repository } from 'typeorm';
import { StockEntity } from './Stock.entity';
import { StockTransactionEntity, TransactionType } from './StockTransaction.entity';
import { WarehouseEntity } from './Warehouse.entity';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { CreateStockDto } from 'src/dto/create-stock.dto';
import { CreateTransactionDto } from 'src/dto/create-transaction.dto';


@Injectable()
export class ProductContService {

    constructor(
        @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
        @InjectRepository(StockEntity) private stockRepo: Repository<StockEntity>,
        @InjectRepository(StockTransactionEntity) private trxRepo: Repository<StockTransactionEntity>,
        @InjectRepository(WarehouseEntity) private whRepo: Repository<WarehouseEntity>) {

    }

    async createProduct(dto: CreateProductDto) {
        const product = this.productRepo.create({
            name: dto.name,
            sku: dto.sku,
            description: dto.description,
            type: { id: dto.typeId },
        });
        return this.productRepo.save(product);
    }

    // ✅ Create stock entry (init stock for a warehouse)
    async createStock(dto: CreateStockDto) {
        const stock = this.stockRepo.create({
            product: { id: dto.productId } as any,
            warehouse: { id: dto.warehouseId } as any,
            quantity: dto.quantity,
            costPrice: dto.costPrice,
            sellingPrice: dto.sellingPrice,
            lastUpdated: new Date(),
        });
        return this.stockRepo.save(stock);
    }

    // ✅ Handle stock transaction (IN/OUT)
    async createTransaction(dto: CreateTransactionDto) {
        const stock = await this.stockRepo.findOne({
            where: { product: { id: dto.productId }, warehouse: { id: dto.warehouseId } },
            relations: ['product', 'warehouse'],
        });

        if (!stock) throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);

        // ปรับจำนวนสินค้า
        if (dto.type === TransactionType.IN) {
            stock.quantity += dto.quantity;
        } else if (dto.type === TransactionType.OUT) {
            if (stock.quantity < dto.quantity) {
                throw new HttpException('Not enough stock', HttpStatus.BAD_REQUEST)
            }
            stock.quantity -= dto.quantity;
        }

        await this.stockRepo.save(stock);

        // บันทึกประวัติ
        const trx = this.trxRepo.create({
            product: { id: dto.productId } as any,
            warehouse: { id: dto.warehouseId } as any,
            type: dto.type,
            quantity: dto.quantity,
            reference: dto.reference,
        });

        return this.trxRepo.save(trx);
    }

    // ✅ Get stock with product info
    async getStockByProduct(productId: number) {
        return this.stockRepo.find({
            where: { product: { id: productId } },
            relations: ['product', 'warehouse'],
        });
    }

    // ✅ Get all transactions
    async getTransactions() {
        return this.trxRepo.find({ relations: ['product', 'warehouse'] });
    }
}
