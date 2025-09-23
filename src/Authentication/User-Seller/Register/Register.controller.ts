import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RegisterService } from './Register.service';
import { RegisterEntityEntity } from './Register-entity.entity';
import { RouteMetadata } from 'nestjs-gis'

@RouteMetadata()
@Crud({
    model:{type:RegisterEntityEntity},
    params:{
    }
})
@Controller('rest/Register')
export class RegisterController {

  constructor(private service: RegisterService) { }

}
