import { Body, Controller, Get, Inject, OnModuleInit, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { LoginRequestDto, RegisterRequestDto } from 'apps/basic-service/src/user/user.dto';
import { RegisterResponse } from 'apps/basic-service/src/user/user.pd';
import { UserInfoDto } from 'apps/common/dto/common.dto';
import { JsonData, ResponseData } from 'apps/common/utils/jsonData';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BasicServiceClient, BASIC_SERVICE_NAME } from './basic.pb';

@Controller('basic')
export class BasicController implements OnModuleInit {
  constructor(private readonly authService: AuthService) { }
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
    let res = await this.svc.login(body).toPromise();
    res = JsonData.parse(res)
    if (res.code === 200) {
      return JsonData.parse(await this.authService.certificate(res.data))
    }
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/info')
  async getUserInfo(@Request() req: UserInfoDto): Promise<ResponseData> {
    const data: ResponseData = await this.svc.getUserInfo({ user: JSON.stringify(req.user) }).toPromise();
    console.log(55, data)
    return JsonData.parse(data)
  }
}
