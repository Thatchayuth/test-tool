import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import { on } from 'events';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AdressdeliveryEntityEntity } from './Adressdelivery-entity.entity';
import { TokenEntityEntity } from '../Login/Token-entity.entity';
import { ResetPasswordlogEntity } from '../Login/ResetPasswordlog.entity';

@Entity('RegisterEntity')
export class RegisterEntityEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column()
    Username: string;

    @Column()
    Password: string;

    @Column()
    Email: string;

    @Column()
    CreateUser: Date;

    @Column( { nullable: true } )
    UpdateUser: Date;

    @Column()
    Role: number;

    @OneToMany(() => AdressdeliveryEntityEntity, (adressdelivery) => adressdelivery.register ,  { cascade: true })
    adressdelivery: AdressdeliveryEntityEntity[];

    @OneToMany(() => TokenEntityEntity, (Token) => Token.User ,   { cascade: true })
    Token: TokenEntityEntity[];

    @OneToMany(() => ResetPasswordlogEntity, (ResetPasswordlog) => ResetPasswordlog.user ,   { cascade: true })
    ResetPasswordlog: ResetPasswordlogEntity[];
}
