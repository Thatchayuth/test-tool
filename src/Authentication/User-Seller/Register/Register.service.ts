import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterEntityEntity } from './Register-entity.entity';

@Injectable()
export class RegisterService extends TypeOrmCrudService<RegisterEntityEntity>{

    constructor(@InjectRepository(RegisterEntityEntity) repo) {
        super(repo);
    }

}
