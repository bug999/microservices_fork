import { Module } from '@nestjs/common';
import { MockProjectModule } from './project/project.module';

@Module({
  imports: [MockProjectModule],
  controllers: [],
  providers: [],
})
export class MockServiceModule { }
