import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   database: 'micro_auth',
    //   username: 'kevin',
    //   password: null,
    //   entities: ['dist/**/*.entity.{ts,js}'],
    //   synchronize: true, // never true in production!
    // }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule { }
