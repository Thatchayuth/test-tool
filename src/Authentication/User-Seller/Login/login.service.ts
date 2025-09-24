/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterEntityEntity } from '../Register/Register-entity.entity';
import { Repository } from 'typeorm';
import { TokenEntityEntity } from './Token-entity.entity';
import { AdressdeliveryEntityEntity } from '../Register/Adressdelivery-entity.entity';
import { LoginDto, LoginResponseDto } from 'src/dto/Login.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(RegisterEntityEntity) private Regisrepo: Repository<RegisterEntityEntity>,
        @InjectRepository(TokenEntityEntity) private Tokenrepo: Repository<TokenEntityEntity>,
        @InjectRepository(AdressdeliveryEntityEntity) private Addressrepo: Repository<AdressdeliveryEntityEntity>,
        private readonly jwtService: JwtService,
    ) { }

    async Login(login: LoginDto) {
        console.log(login);
        // find user by username
        const user = await this.Regisrepo.findOne({
            where: { Username: login.Username },
            relations: ['adressdelivery'], // ✅ join addresses
        });

        // if user not found
        if (!user) {
            throw new HttpException(
                { message: 'Username or Password incorrect' },
                HttpStatus.BAD_REQUEST
            );
        }

        // verify password
        const isPasswordValid = await bcrypt.compare(login.Password, user.Password);

        // if password is incorrect
        if (!isPasswordValid) {
            throw new HttpException(
                { message: 'Username or Password incorrect' },
                HttpStatus.BAD_REQUEST
            );
        }

        // generate  token
        const payload = { userId: user.id, username: user.Username, role: user.Role };
        const token = this.jwtService.sign(payload);

        // save token to database
        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 1); // set expire time to 1 hour
        const tokenEntity = this.Tokenrepo.create({
            Token: token,
            ExpireDate: expireDate,
            User: user,
            CreateDate: new Date(),
        });
        await this.Tokenrepo.save(tokenEntity);

        const loginResponse = new LoginResponseDto();
        loginResponse.Token = token;
        loginResponse.user = {
            id: user.id,
            Username: user.Username,
            Email: user.Email,
            Role: user.Role,
            addresses: user.adressdelivery,
        };

        return {
            token,
            user: {
                id: user.id,
                Username: user.Username,
                Email: user.Email,
                Role: user.Role,
                addresses: user.adressdelivery, // array ของ addresses
            },
        };

    }
}
