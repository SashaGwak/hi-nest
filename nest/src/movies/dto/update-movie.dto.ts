import { IsNumber, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-movie.dto";

// npm i @nestjs/mapped-types
// UpdateMovieDto는 CreateMovieDto와 똑같음
export class UpdateMovieDto extends PartialType(CreateMovieDto) {

}