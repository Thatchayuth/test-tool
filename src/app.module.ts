import { RegisterModule } from './Authentication/User-Seller/Register/register.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeocodingServiceService } from './Authentication/User-Seller/GeocodingService.service';

@Module({
  imports: [
    RegisterModule, TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'MyNewPass123!',
      database: 'TestDatabase',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ❌ ห้ามใช้ใน production
      options: {
        encrypt: false, // ถ้า SQL Server ไม่ได้บังคับ SSL
        trustServerCertificate: true, // ใช้ตอน dev
      },
    }),
    RegisterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
