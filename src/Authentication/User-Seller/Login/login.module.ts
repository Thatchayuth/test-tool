/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntityEntity } from './Token-entity.entity';
import { RegisterEntityEntity } from '../Register/Register-entity.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AdressdeliveryEntityEntity } from '../Register/Adressdelivery-entity.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt.strategy';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SuperSecretKey123!',
      signOptions: { expiresIn: '1h' }, // กำหนดอายุ token
    }),
    TypeOrmModule.forFeature([TokenEntityEntity, RegisterEntityEntity, AdressdeliveryEntityEntity])],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
})
export class LoginModule { }
