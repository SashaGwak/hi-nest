import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // string을 리턴하는 getHello라는 함수
  getHello(): string {
    return this.appService.getHello();
  }
}