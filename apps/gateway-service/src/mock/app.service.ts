import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MockServiceClient, SERVICE_NAME } from './app.pb';

@Injectable()
export class MockService {
  private svc: MockServiceClient;

  @Inject(SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<MockServiceClient>(SERVICE_NAME);
  }
}
