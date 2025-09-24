/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RegisterController } from './Register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterService } from './Register.service';
import { RegisterEntityEntity } from './Register-entity.entity';
import { GeocodingServiceService } from '../GeocodingService.service';
import { AdressdeliveryEntityEntity } from './Adressdelivery-entity.entity';


@Module({
    imports: [TypeOrmModule.forFeature([RegisterEntityEntity,AdressdeliveryEntityEntity])],
    controllers: [RegisterController],
    providers: [
        RegisterService, GeocodingServiceService],
})
export class RegisterModule { }
