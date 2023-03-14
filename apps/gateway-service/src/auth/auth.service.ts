// src/logical/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JsonData } from 'apps/common/utils/jsonData';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = { username: user.username, id: user.id };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      console.log(token)
      return JsonData.buildSuccess({
        token,
        ...user
      });
    } catch (error) {
      return JsonData.buildError('jwt 签证失败');
    }
  }
}