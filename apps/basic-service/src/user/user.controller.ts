import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Basic_Service, RegisterRequest } from './user.pd';
import { LoginRequestDto, RegisterRequestDto } from './user.dto';
import { JsonData } from 'apps/common/utils/jsonData';
import { User } from '../entity/user.entity';
import { UserInfoDto } from 'apps/common/dto/common.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('login')
  @GrpcMethod(Basic_Service, 'Login')
  async login(@Body() body: LoginRequestDto) {
    try {
      const user = await this.userService.login(body)
      console.log(user)
      if (!user)
        return JsonData.buildError('用户不存在');
      return JsonData.buildSuccess(user)
      // return await this.authService.certificate(user)
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
      if (res.code === 200) return JsonData.buildSuccess(res.data, res.msg)
      return JsonData.buildError(res.msg);
    } catch (error) {
      return JsonData.buildError(error)
    }
  }

  @Get('user/info')
  @GrpcMethod(Basic_Service, 'getUserInfo')
  async getUserInfo(@Body() body: UserInfoDto) {
    console.log('req2', body)
    const user = JSON.parse(body.user)
    return await this.userService.getUserInfo(user.userId)
  }
}
