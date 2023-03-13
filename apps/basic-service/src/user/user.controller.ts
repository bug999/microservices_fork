import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Basic_Service, RegisterRequest } from './user.pd';
import { LoginRequestDto, RegisterRequestDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('login')
  @GrpcMethod(Basic_Service, 'Login')
  login(@Body() body: LoginRequestDto) {
    return this.userService.login(body);
  }

  @Post('register')
  @GrpcMethod(Basic_Service, 'Register')
  async register(@Body() body: RegisterRequestDto) {
    console.log(22)
    const { userName, password, repassword, mobile, email } = body;
    console.log(password, repassword, mobile, userName)
    const res = await this.userService.register(body)
    console.log(22, res)
    return res;
  }
}
