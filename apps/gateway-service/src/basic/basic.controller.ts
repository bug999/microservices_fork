import { Body, Controller, Inject, OnModuleInit, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginRequestDto, RegisterRequestDto } from 'apps/basic-service/src/user/user.dto';
import { RegisterResponse } from 'apps/basic-service/src/user/user.pd';
import { JsonData, ResponseData } from 'apps/common/utils/jsonData';
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
  private async register(@Body() body: RegisterRequestDto): Promise<ResponseData> {
    const res = await this.svc.register(body).toPromise();
    return JsonData.parse(res);
  }

  @Post('login')
  private async login(@Body() body: LoginRequestDto): Promise<ResponseData> {
    const res = await this.svc.login(body).toPromise();
    return JsonData.parse(res);
  }
}
