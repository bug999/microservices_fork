import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // '/public' 是路由名称，即你访问的路径为：host/public
  // serveStatic 为 serve-static 导入的中间件，其中'../public' 为本项目相对于src目录的绝对地址
  // app.use('/public', serveStatic(path.join(__dirname, '../public'), {
  //   maxAge: '1d',
  //   extensions: ['jpg', 'jpeg', 'png', 'gif'],
  // }));
  await app.listen(30001);
}
bootstrap();
