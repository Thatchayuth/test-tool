import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './Product.entity';
import { WarehouseEntity } from './Warehouse.entity';

export enum TransactionType {
  IN = 'IN',       // รับเข้า
  OUT = 'OUT',     // จ่ายออก
  TRANSFER = 'TRANSFER', // โอนคลัง
  ADJUST = 'ADJUST',     // ปรับสต๊อก
}

@Entity('StockTransaction')
export class StockTransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @ManyToOne(() => WarehouseEntity, { onDelete: 'CASCADE' })
  warehouse: WarehouseEntity;

  @Column({ type: 'varchar', length: 10 })
  type: TransactionType;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ nullable: true })
  reference: string; // อ้างอิงใบ PO, Invoice, Order ID

  @Column({})
  createdAt: Date;
}
