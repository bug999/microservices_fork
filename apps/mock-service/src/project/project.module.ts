import { Module } from '@nestjs/common';
import { MockProjectController } from './project.controller';
import { MockProjectService } from './project.service';
@Module({
  imports: [

  ],
  controllers: [MockProjectController],
  providers: [MockProjectService],
})
export class MockProjectModule { }
