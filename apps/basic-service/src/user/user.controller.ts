import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Basic_Service, RegisterRequest } from './user.pd';
import { LoginRequestDto, RegisterRequestDto } from './user.dto';
import { AuthService } from '../auth/auth.service';
import { JsonData } from 'apps/common/utils/jsonData';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Get('login')
  @GrpcMethod(Basic_Service, 'Login')
  async login(@Body() body: LoginRequestDto) {
    try {
      const user = await this.userService.login(body)
      console.log(user)
      if (!user)
        return JsonData.buildError('用户不存在');
      return await this.authService.certificate(user)
    } catch (error) {
      return JsonData.buildError(error);
    }
  }

  @Post('register')
  @GrpcMethod(Basic_Service, 'Register')
  async register(@Body() body: RegisterRequestDto) {
    const { userName, password, repassword, mobile, email } = body;
    console.log(password, repassword, mobile, userName)
    try {
      const res = await this.userService.register(body)
      console.log(22, res)
      if (res.code === 200) return JsonData.buildSuccess(res.msg, res.data)
      return JsonData.buildError(res.msg);
    } catch (error) {
      return JsonData.buildError(error)
    }
  }
}
