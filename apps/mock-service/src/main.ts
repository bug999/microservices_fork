import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MockServiceModule } from './app.module';
import { Mock_Service } from './project/project.pd';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MockServiceModule, {
    transport: Transport.GRPC,
    name: Mock_Service,
    options: {
      url: '0.0.0.0:30003',
      package: 'mock',
      protoPath: join('config/proto/mock.proto'),
    },
  });
  await app.listen();
}
bootstrap();
