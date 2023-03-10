import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicModule } from './basic/basic.module';

@Module({
  imports: [BasicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
