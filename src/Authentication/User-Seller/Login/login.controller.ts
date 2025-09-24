/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from 'src/dto/Login.dto';
import { JwtAuthGuard } from 'src/JwtAuthGuard';

@Controller('rest/Login')
export class LoginController {
    constructor(private LoginService: LoginService) { }

    @Post('LoginUser')
    async login(@Body() dto: LoginDto) {
        return this.LoginService.Login(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(req) {
        console.log(req.user);
        return req.user; // payload ที่ validate แล้ว
    }
}
