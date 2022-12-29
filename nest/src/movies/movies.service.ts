import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    // 진짜 데이터베이스는 DB에 대한 쿼리를 써줘야함
    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id:number): Movie {
        // return this.movies.find(movie => movie.id === +id); // +id 숫자로 바꿈
        const movie = this.movies.find(movie => movie.id === id); 
        // nest 예외처리
        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`)
        }
        return movie;
    }
    
    deleteOne(id:number) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
    }

    create(movieData : CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1, 
            ...movieData,
        });
    }

    update(id:number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }
}