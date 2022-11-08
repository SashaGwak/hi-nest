import { Controller, Delete, Get, Param, Post, Patch, Body} from '@nestjs/common';

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

    @Post()
    create(@Body() movieData){
        console.log(movieData); // { name: 'Tenet', director: 'Nolan' }
        return movieData;
    }

    @Delete('/:id') 
    remove(@Param('id') movieId:string) {
        return `This will delete a movie with the id: ${movieId}`;
    }

    @Patch('/:id') 
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
