import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// bootstrap 이름은 아무거나 지정해줘도 됨 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // AppModule은 클래스
  await app.listen(3000);
}
bootstrap();
