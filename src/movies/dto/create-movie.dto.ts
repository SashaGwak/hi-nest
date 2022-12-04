import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
    // npm i class-validator class-transformer 설치
    @IsString()
    readonly title : string; 

    @IsNumber()
    readonly year : number; 
    
    @IsOptional()
    @IsString({ each: true })
    // each true => 모든 요소를 하나씩 검사하는 것
    readonly genres : string[];
}