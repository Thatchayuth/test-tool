import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RegisterEntityEntity } from '../Register/Register-entity.entity';

@Entity('ResetPasswordlog')
export class ResetPasswordlogEntity {
    @PrimaryGeneratedColumn() id:number;

    @ManyToOne(() => RegisterEntityEntity, (user) => user.ResetPasswordlog , { onDelete: 'CASCADE' })
    user: RegisterEntityEntity;

    @Column( {nullable: true} )
    resetToken: string;

    @Column()
    createdAt: Date;

    @Column( {nullable: true} )
    expireAt: Date;

}
