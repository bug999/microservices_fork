import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
