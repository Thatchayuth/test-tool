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
import { ResetPasswordlogEntity } from './ResetPasswordlog.entity';
@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(RegisterEntityEntity) private Regisrepo: Repository<RegisterEntityEntity>,
        @InjectRepository(TokenEntityEntity) private Tokenrepo: Repository<TokenEntityEntity>,
        @InjectRepository(AdressdeliveryEntityEntity) private Addressrepo: Repository<AdressdeliveryEntityEntity>,
        @InjectRepository(ResetPasswordlogEntity) private ResetPasswordlogRepo: Repository<ResetPasswordlogEntity>,
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
        const token = this.jwtService.sign(payload, { expiresIn: '1h' });

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

        // return token and user info
        // return { token, user };
        // สร้าง response object
        const loginResponse = new LoginResponseDto();
        loginResponse.Token = token;
        loginResponse.user = {
            id: user.id,
            Username: user.Username,
            Email: user.Email,
            Role: user.Role,
            addresses: user.adressdelivery,
        };

        // return response object
        return loginResponse

    }

    async forgotPassword(email: string) {
        const user = await this.Regisrepo.findOne({ where: { Email: email } });
        if (!user) {
            throw new HttpException('Email not found', HttpStatus.BAD_REQUEST);
        }

        // สร้าง reset token (15 นาที)
        const payload = { userId: user.id, email: user.Email };
        const resetToken = this.jwtService.sign(payload, { expiresIn: '15m' });

        // บันทึก token ลง DB (optional)
        const resetPasswordLog = this.ResetPasswordlogRepo.create({
            user,
            resetToken,
            createdAt: new Date(),
            expireAt: new Date(Date.now() + 15 * 60 * 1000),
        });
        await this.ResetPasswordlogRepo.save(resetPasswordLog);

        // ส่งอีเมล
    //     await this.mailerService.sendMail({
    //         to: user.Email,
    //         subject: 'Reset your password',
    //         html: `
    //   <p>Click the link to reset your password:</p>
    //   <a href="http://localhost:4200/reset-password?token=${resetToken}">
    //     Reset Password
    //   </a>
    // `,
    //     });

        return { message: 'Reset password link sent to email' };
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const payload = this.jwtService.verify(token); // ตรวจสอบว่า token valid

            const user = await this.ResetPasswordlogRepo.findOne({ where: { id: payload.userId } });
            if (!user || user.resetToken !== token) {
                throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
            }

            // hash password ใหม่
            const userupdate = await this.Regisrepo.findOne({ where: { id: payload.userId } });
            const saltRounds = 10;
            userupdate!.Password = await bcrypt.hash(newPassword, saltRounds);

            // ลบ reset token
            user.resetToken = '';
            user.expireAt = new Date();

            await this.ResetPasswordlogRepo.save(user);
            return { message: 'Password reset successful' };

        } catch (error) {
            throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
        }
    }
}
