import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

// 새 모듈 만들어보기
// app.module파일이므로 AppContorller, AppService만 가지는 게 바람직. 다른 모듈 파일들이랑 섞이지 않게~~사용할 모듈들을 import만 해주기
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}