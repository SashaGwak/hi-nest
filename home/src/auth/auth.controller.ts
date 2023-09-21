import { Controller,Get, Param, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {

    }

    @Get()
    getHello():string{
        return this.authService.getHello();
    }

    @Get('admin')
    async fetchData() {
        const data = await this.authService.getAdmin();
        return data;
    }

    @Post('packing')
    async CreatePacking(@Body() createData:any) {
        console.log('Body : ', createData);
        const data = await this.authService.CreatePacking(createData);
        return data;
    }

    @Get(':id')
    async getUser(@Param('id') adminId: number) {
        console.log('adminId : ',adminId); 
        const data = await this.authService.getUser(adminId);
        return data;
    }
}
