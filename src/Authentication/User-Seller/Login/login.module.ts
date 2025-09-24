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
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
    JwtModule.register({
      secret: 'yourSecretKeyHere', // ✅ ต้องมีค่า secret
      signOptions: { expiresIn: '1h' },
    }),
        TypeOrmModule.forFeature([TokenEntityEntity, RegisterEntityEntity, AdressdeliveryEntityEntity])],
    controllers: [LoginController],
    providers: [LoginService, JwtService],
})
export class LoginModule { }
