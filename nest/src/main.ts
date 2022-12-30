import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';

// bootstrap 이름은 아무거나 지정해줘도 됨 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // AppModule은 클래스
  // 유효성 검사위한 파이프 만들기
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist true인경우 아무 decorator도 없는 어떠한 Property의 object를 거름
      whitelist : true,
      forbidNonWhitelisted : true,
      // transform true로 놓으면 리퀘스트할 때 마다 실제타입으로 변환
      transform: true,  
    }), 
  ); 
  await app.listen(3000);
}

app.useStaticAssets(join(__dirname, '..', 'src', 'public'));

bootstrap();
