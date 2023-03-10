import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Basic_Service, RegisterRequest } from './user.pd';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('login')
  login(): string {
    return this.userService.login();
  }

  @Post('register')
  @GrpcMethod(Basic_Service, 'Register')
  async register(@Body() body: RegisterRequest) {
    console.log(22)
    const { userName, password, repassword, mobile, email } = body;
    console.log(password, repassword, mobile)
    return await this.userService.register(body);
  }
}
