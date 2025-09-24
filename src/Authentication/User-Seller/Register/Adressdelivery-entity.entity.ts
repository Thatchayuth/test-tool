import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RegisterEntityEntity } from './Register-entity.entity';
import { IsNumber } from 'class-validator';


@Entity('AdressdeliveryEntity')
export class AdressdeliveryEntityEntity {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(() => RegisterEntityEntity, (register) => register.id , { onDelete: 'CASCADE' })
    register: RegisterEntityEntity;

    @Column({ nullable: true, length: 900 })
    Adress: string;

    @Column()

    Province: number;

    @Column()

    District: number;

    @Column()

    Subdistrict: number;

    @Column()

    Postalcode: number;

    @Column()

    Phonenumber: number;

    @Column({ type: 'float', nullable: true })
    lat: number; // ละติจูด (nullable ถ้ายังไม่คำนวณ)

    @Column({ type: 'float', nullable: true })
    lng: number;

    @Column({ nullable: true })

    Importance: number;
}
