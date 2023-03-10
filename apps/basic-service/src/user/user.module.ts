import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }