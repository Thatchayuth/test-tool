import { Type } from 'class-transformer';
import { IsString, IsEmail, IsDate, IsNumber, MinLength, IsOptional, IsArray, ValidateNested } from 'class-validator';

export class CreateRegisterDto {
    @IsString()
    @MinLength(3)
    Username: string;

    @IsString()
    @MinLength(6)
    Password: string;

    @IsEmail()
    Email: string;

    @IsDate()
    @Type(() => Date) 
    CreateUser: Date;

    @IsNumber()
    Role: number;

    @IsArray()
    @ValidateNested({ each: true })   // ✅ บอกว่าเป็น array ของ object
    @Type(() => CreateAddressDto)     // ✅ แปลง JSON → class
    addresses: CreateAddressDto[];
}

export class CreateAddressDto {
    @IsOptional()
    id?: number;

    @IsString()
    Adress: string;

    @IsNumber()
    Province: number;

    @IsNumber()

    District: number;

    @IsNumber()

    Subdistrict: number;

    @IsNumber()
    Postalcode: number;

    @IsString()

    Phonenumber: string;

    @IsNumber()
    lat: number; // ละติจูด (nullable ถ้ายังไม่คำนวณ)

    @IsNumber()
    lng: number;

    @IsNumber()

    Importance: number;
} 
