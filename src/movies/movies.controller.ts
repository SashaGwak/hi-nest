import { Controller, Get, Param } from '@nestjs/common';

// movies부분도 url => /movies로 가야함
@Controller('movies')
export class MoviesController {

    @Get() 
    getAll(){
        return "This will return all movies";
    }

    @Get('/:id')
    // param에서 id 가져와서 movieId 변수명인 string으로 저장
    getOne(@Param('id') movieId: string){
        return `This will return one movie with the id: ${movieId}`;
    }
}
