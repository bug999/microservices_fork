import { Body, Controller, Inject, OnModuleInit, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { RegisterRequestDto } from 'apps/basic-service/src/user/user.dto';
import { RegisterResponse } from 'apps/basic-service/src/user/user.pd';
import { Observable } from 'rxjs';
import { BasicServiceClient, BASIC_SERVICE_NAME } from './basic.pb';

@Controller('basic')
export class BasicController implements OnModuleInit {
  private svc: BasicServiceClient;

  @Inject(BASIC_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<BasicServiceClient>(BASIC_SERVICE_NAME);
  }

  @Post('register')
  private async register(@Body() body: RegisterRequestDto): Promise<Observable<RegisterResponse>> {
    console.log('11')
    const { userName, password, repassword, mobile, email } = body;

    console.log(password, repassword, mobile)
    return this.svc.register(body);
  }
}
