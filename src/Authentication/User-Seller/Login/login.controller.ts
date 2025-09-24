/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from 'src/dto/Login.dto';

@Controller('rest/Login')
export class LoginController {
    constructor(private LoginService: LoginService) { }

    @Post('LoginUser')
    async login(@Body() dto: LoginDto) {
        return this.LoginService.Login(dto);
    }
}
