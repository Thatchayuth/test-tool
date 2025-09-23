/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RegisterController } from './Register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterService } from './Register.service';
import { RegisterEntityEntity } from './Register-entity.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RegisterEntityEntity])],
    controllers: [RegisterController],
    providers: [RegisterService],
})
export class RegisterModule { }
