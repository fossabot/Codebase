import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:4200'],
    },
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  await app.listen(3000).then(() => {
    console.log('YEAH!! http://localhost:3000');
  });
}
bootstrap();
