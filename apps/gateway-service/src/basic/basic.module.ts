import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';
import { BasicController } from './basic.controller';
import { BASIC_SERVICE_NAME, BASIC_PACKAGE_NAME } from './basic.pb';
import { BasicService } from './basic.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: BASIC_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:30002',
          package: BASIC_PACKAGE_NAME,
          protoPath: join('config/proto/basic.proto'),
        },
      },
    ]),
    AuthModule
  ],
  controllers: [BasicController],
  providers: [BasicService],
  exports: [BasicService],
})
export class BasicModule { }
