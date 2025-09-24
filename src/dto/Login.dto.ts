import { IsString } from "class-validator";
import { AdressdeliveryEntityEntity } from "src/Authentication/User-Seller/Register/Adressdelivery-entity.entity";


export class LoginDto {

    @IsString()
    Username: string;

    @IsString()
    Password: string;
}

export class LoginResponseDto {
    Token: string;
    user: {
        id: number;
        Username: string
        Email: string
        Role: number
        addresses: AdressdeliveryEntityEntity[]
    }


    }