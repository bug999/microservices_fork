import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { BasicServiceClient, BASIC_SERVICE_NAME, LoginRequest, ValidateResponse } from './basic.pb';

@Injectable()
export class BasicService {
  private svc: BasicServiceClient;

  @Inject(BASIC_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<BasicServiceClient>(BASIC_SERVICE_NAME);
  }
}
