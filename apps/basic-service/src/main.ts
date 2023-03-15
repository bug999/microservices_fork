import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { Basic_Service } from './user/user.pd';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    name: Basic_Service,
    options: {
      url: '0.0.0.0:30002',
      package: 'basic',
      protoPath: join('config/proto/basic.proto'),
    },
  });
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen();
  // await NestFactory.create(AppModule);
  // app.use(express.json()); // For parsing application/json
  // app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // await app.listen(30000);
}
bootstrap();
