import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import { on } from 'events';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AdressdeliveryEntityEntity } from './Adressdelivery-entity.entity';
import { TokenEntityEntity } from '../Login/Token-entity.entity';

@Entity('RegisterEntity')
export class RegisterEntityEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column()
    @IsString()
    Username: string;

    @Column()
    @IsString()
    Password: string;

    @Column()
    @IsEmail()
    Email: string;

    @Column()
    @IsDate()
    CreateUser: Date;

    @Column( { nullable: true } )
    @IsDate()
    UpdateUser: Date;

    @Column()
    @IsNumber()
    Role: number;

    @OneToMany(() => AdressdeliveryEntityEntity, (adressdelivery) => adressdelivery.register)
    adressdelivery: AdressdeliveryEntityEntity[];

    @OneToMany(() => TokenEntityEntity, (adressdelivery) => adressdelivery.User)
    Token: TokenEntityEntity[];
}
