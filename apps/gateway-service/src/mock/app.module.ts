import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';
import { MockController } from './app.controller';
import { SERVICE_NAME, PACKAGE_NAME } from './app.pb';
import { MockService } from './app.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:30003',
          package: PACKAGE_NAME,
          protoPath: join('config/proto/mock.proto'),
        },
      },
    ]),
    AuthModule
  ],
  controllers: [MockController],
  providers: [MockService],
  exports: [MockService],
})
export class MockModule { }
