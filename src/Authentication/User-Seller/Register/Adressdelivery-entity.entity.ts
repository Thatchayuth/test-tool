import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RegisterEntityEntity } from './Register-entity.entity';
import { IsNumber } from 'class-validator';


@Entity('AdressdeliveryEntity')
export class AdressdeliveryEntityEntity {
    @PrimaryGeneratedColumn() id:number;

    @ManyToOne(() => RegisterEntityEntity, (register) => register.id)
    register: RegisterEntityEntity;

    @Column({ nullable: true , length: 900 })
    Adress: string;

    @Column()
    @IsNumber()
    Province: number;

    @Column()
    @IsNumber()
    District: number;

    @Column()
    @IsNumber()
    Subdistrict: number;

    @Column()
    @IsNumber()
    Postalcode: number;

    @Column()
    @IsNumber()
    Phonenumber: number;

    @Column({ nullable: true })
    @IsNumber()
    Importance: number;
}
