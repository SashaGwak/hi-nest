import { Controller, Delete, Get, Param, Post, Patch, Body, Query} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

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
    getOne(@Param('id') movieId: string): Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData){
        // console.log(movieData); // { name: 'Tenet', director: 'Nolan' }
        return this.moviesService.create(movieData);
    }

    @Delete(':id') 
    remove(@Param('id') movieId:string) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch(':id') 
    patch(@Param('id') movieId:string, @Body() updateData) {
        return {
            updateData: movieId, 
            ...updateData, 
            // http://localhost:3000/movies/12 일때 
            // {
            //     "updateData": "12",
            //     "name": "Tenet",
            //     "director": "Nolan"
            // }
        };
    }
}