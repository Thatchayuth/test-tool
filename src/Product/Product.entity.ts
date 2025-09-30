import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTypeEntity } from './ProductType.entity';
import { StockEntity } from './Stock.entity';

@Entity('Product')
export class ProductEntity {
      @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // ชื่อสินค้า

  @Column({ unique: true })
  sku: string; // รหัสสินค้า (Stock Keeping Unit)

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => ProductTypeEntity, (type) => type.products, { onDelete: 'SET NULL' })
  type: ProductTypeEntity;

  @OneToMany(() => StockEntity, (stock) => stock.product ,{ cascade: true })
  stockEntries: StockEntity[];
}
