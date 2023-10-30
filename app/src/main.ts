import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger';
import { Logger } from '@nestjs/common';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV === 'prod') {
  Logger.log('prod');
  dotenv.config({ path: path.join(__dirname, '../.env-prod') });
} else if (process.env.NODE_ENV === 'dev') {
  Logger.log('dev');
  dotenv.config({ path: path.join(__dirname, '../.env-dev') });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(5000);
}
bootstrap();
