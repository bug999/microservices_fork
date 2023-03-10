import { Body, Controller, Inject, OnModuleInit, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BasicServiceClient, RegisterResponse, RegisterRequest, BASIC_SERVICE_NAME, LoginRequest, LoginResponse } from './basic.pb';

@Controller('basic')
export class BasicController implements OnModuleInit {
  private svc: BasicServiceClient;

  @Inject(BASIC_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<BasicServiceClient>(BASIC_SERVICE_NAME);
  }

  @Post('register')
  private async register(@Body() body: RegisterRequest): Promise<Observable<RegisterResponse>> {
    console.log('11')
    const { userName, password, repassword, mobile, email } = body;

    console.log(password, repassword, mobile)
    return this.svc.register(body);
  }

  @Put('login')
  private async login(@Body() body: LoginRequest): Promise<Observable<LoginResponse>> {
    return this.svc.login(body);
  }
}
