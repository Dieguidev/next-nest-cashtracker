import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as morgan from 'morgan';
import { envs } from './config/envs';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: true,
    }),
  );

  app.use(morgan('dev'));

  await app.listen(envs.port ?? 3000);

  logger.log(`Server is running on http://localhost:${envs.port}`);
}
void bootstrap();
