import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { AllExceptionsFilter } from './utils/any-exception.filter';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { TransformInterceptor } from './utils/transform.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(30001);
}
bootstrap();
