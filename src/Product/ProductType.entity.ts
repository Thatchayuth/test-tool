import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './Product.entity';

@Entity('ProductType')
export class ProductTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string; // เช่น "Electronics"

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => ProductEntity, (product) => product.type , { cascade: true })
    products: ProductEntity[];
}
