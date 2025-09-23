import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RegisterEntityEntity } from '../Register/Register-entity.entity';

@Entity('TokenEntity')
export class TokenEntityEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ length: 900 })
    Token: string;

    @Column()
    CreateDate: Date;

    @Column()
    ExpireDate: Date;

    @ManyToOne(() => RegisterEntityEntity, (token) => token.id)
    User: RegisterEntityEntity;
}
