import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterEntityEntity } from './Register-entity.entity';
import { Repository } from 'typeorm';
import { GeocodingServiceService } from '../GeocodingService.service';
import { CreateRegisterDto } from 'src/dto/Register.dto';
import * as bcrypt from 'bcrypt';
import { AdressdeliveryEntityEntity } from './Adressdelivery-entity.entity';
@Injectable()
export class RegisterService {

    constructor(
        private geoService: GeocodingServiceService,
        @InjectRepository(RegisterEntityEntity) private repo: Repository<RegisterEntityEntity>,
        @InjectRepository(AdressdeliveryEntityEntity) private repoAddress: Repository<AdressdeliveryEntityEntity>,) {
    }

    async CreteRigister(dto: CreateRegisterDto) {
        console.log(dto);

        //เช็คว่ามี Usernameนี่้ไหม
        const Username = await this.repo.findOne({ where: { Username: dto.Username } });
        if (Username) {
            throw new HttpException(
                { message: 'Username already in use' },
                HttpStatus.BAD_REQUEST
            );
        }


        //เช็คว่ามี Emailนี่้ไหม
        const existingUser = await this.repo.findOne({ where: { Email: dto.Email } });
        if (existingUser) {
            throw new HttpException(
                { message: 'Email already in use' },
                HttpStatus.BAD_REQUEST
            );
        }

        // ดึงพิกัดจาก addresses
        for (const addr of dto.addresses) {
            if (addr.Adress) {
                const coordinates = await this.geoService.getCoordinates(addr.Adress);
                addr.lat = coordinates?.lat ?? null;
                addr.lng = coordinates?.lng ?? null;
            }
        }

        // เข้ารหัสรหัสผ่าน
        const saltRounds = 10;
        dto.Password = await bcrypt.hash(dto.Password, saltRounds);
        dto.CreateUser = new Date();

        // สร้าง entity จาก dto
        // สร้าง entity สำหรับ addresses
        const addresses = dto.addresses.map(addr => {
            const addressEntity = this.repoAddress.create(addr);
            return addressEntity;
        });

        // สร้าง entity สำหรับ user พร้อมแนบ addresses
        const userEntity = this.repo.create({
            ...dto,
            adressdelivery: addresses, // ใส่ array entity
        });

        // set register ใน child
        addresses.forEach(addr => {
            addr.register = userEntity;
        });

        // บันทึกข้อมูล
        const saved = await this.repo.save(userEntity);


        return saved;
    }


}
