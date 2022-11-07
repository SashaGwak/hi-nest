import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // string을 리턴하는 getHello라는 함수
    return this.appService.getHello();
  }

  // 데코레이터는 꾸며주는 함수나 클래스랑 붙어있어야함. 공백X
  // app.get('/hello')랑 같은 의미
  @Get('/hello')
  sayHello(): string {
    return 'Hello everyone';
  }
}