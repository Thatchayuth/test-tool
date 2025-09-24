import { Body, Controller, Get, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RegisterService } from './Register.service';
import { RegisterEntityEntity } from './Register-entity.entity';
import { RouteMetadata } from 'nestjs-gis'
import { CreateRegisterDto } from 'src/dto/Register.dto';

@RouteMetadata()
@Crud({
    model:{type:RegisterEntityEntity},
    params:{
    }
})
@Controller('rest/Register')
export class RegisterController {

  constructor(private service: RegisterService) { }



  @Post('CreateUser')
  async CreateUser(@Body() dto: CreateRegisterDto){
    return this.service.CreteRigister(dto);
  }

}
