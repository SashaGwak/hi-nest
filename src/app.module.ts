import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 데코레이터는 클래스에 함수기능을 추가할 수 있음(걍 클래스 위의 함수)
@Module({
  imports: [],
  // controllers는 express의 라우터 같은 존재(url가져오고 함수 실행)[연결된 컨트롤러]
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// AppModule은 비어있는 클래스 
