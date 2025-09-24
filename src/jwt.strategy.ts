import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SuperSecretKey123!',
    });
  }

  async validate(payload: any) {
    // payload คือ object ที่เราเซ็นตอน login
    // คืนค่าที่จะ attach ไปใน request.user
    return { userId: payload.userId, username: payload.username, role: payload.role ,exp: payload.exp};
  }
}
