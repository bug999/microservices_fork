import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Basic_Service, RegisterRequest } from './user.pd';
import { RegisterRequestDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('login')
  login(): string {
    return this.userService.login();
  }

  @Post('register')
  @GrpcMethod(Basic_Service, 'Register')
  async register(@Body() body: RegisterRequestDto) {
    console.log(22)
    const { userName, password, repassword, mobile, email } = body;
    console.log(password, repassword, mobile, userName)
    const res = await this.userService.register(body)
    console.log(res)
    return res;
  }
}
