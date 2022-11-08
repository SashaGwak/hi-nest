import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';

// 새 모듈 만들어보기
@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [],
})
export class AppModule {}