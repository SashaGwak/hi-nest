import { Controller, Delete, Get, Param, Post, Patch, Body, Query} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// movies부분도 url => /movies로 가야함
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService:MoviesService) {}

    @Get() 
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('search')
    search(@Query('year') seachingYear:string ) {
        return `We are searching for a movie made after: ${seachingYear}`;
    }

    @Get(':id')
    // param에서 id 가져와서 movieId 변수명인 string으로 저장
    getOne(@Param('id') movieId: number): Movie {
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    @Post()
    // CreateMovieDto는 NestJS가 들어오는 쿼리에 대해 유효성을 검사할 수 있게 해줌 
    create(@Body() movieData: CreateMovieDto){
        // console.log(movieData); // { name: 'Tenet', director: 'Nolan' }
        return this.moviesService.create(movieData);
    }

    @Delete(':id') 
    remove(@Param('id') movieId:number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch(':id') 
    patch(@Param('id') movieId:number, @Body() updateData: UpdateMovieDto) {

        return this.moviesService.update(movieId, updateData);
    }
}