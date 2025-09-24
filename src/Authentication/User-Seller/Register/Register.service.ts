import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterEntityEntity } from './Register-entity.entity';
import { Repository } from 'typeorm';
import { GeocodingServiceService } from '../GeocodingService.service';
import { CreateRegisterDto } from 'src/dto/Register.dto';

@Injectable()
export class RegisterService {

    constructor(
        private geoService: GeocodingServiceService,
        @InjectRepository(RegisterEntityEntity) private repo: Repository<RegisterEntityEntity>,) {
    }

    async CreteRigister(dto: CreateRegisterDto) {
        const address = "999, Moo 3, ตำบล นิคมพัฒนา Amphoe Nikhom Phatthana,, Rayong 21180 ไทย";
        for (const addr of dto.addresses) {
            if (addr.Adress) {
                const coordinates = await this.geoService.getCoordinates(addr.Adress);
                addr.lat = coordinates?.lat ?? null;
                addr.lng = coordinates?.lng ?? null;
            }
        }
        const entity = this.repo.create(dto);
        const saved = await this.repo.save(entity);

        return saved;
    }


}
