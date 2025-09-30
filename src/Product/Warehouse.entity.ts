import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StockEntity } from './Stock.entity';

@Entity('Warehouse')
export class WarehouseEntity {
   @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // เช่น "Main Warehouse"

  @Column()
  location: string; // ที่อยู่ หรือ จังหวัด

  @OneToMany(() => StockEntity, (stock) => stock.warehouse,{ cascade: true })
  stockEntries: StockEntity[];
}
