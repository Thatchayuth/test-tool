import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './Product.entity';
import { WarehouseEntity } from './Warehouse.entity';

@Entity('Stock')
export class StockEntity {
   @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.stockEntries, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @ManyToOne(() => WarehouseEntity, (warehouse) => warehouse.stockEntries, { onDelete: 'CASCADE' })
  warehouse: WarehouseEntity;

  @Column({ type: 'int', default: 0 })
  quantity: number; // จำนวนคงเหลือ

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costPrice: number; // ราคาทุน

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sellingPrice: number; // ราคาขาย

  @Column({  })
  lastUpdated: Date;
}
