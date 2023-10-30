import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiOperation, ApiCreatedResponse, ApiProperty} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: '로그인 '})
    @ApiCreatedResponse({
        description: '성공여부',
        schema: {
          example: { access_token : "....", refresh_token : "...." },
        },
    })
    signIn(@Body() signInfo: Record<string, any>) {
        return this.authService.signIn(signInfo.email, signInfo.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        const user = req['user'];
        const token = req['token'];
        const is_new = token ? 1 : 0;

        return {user, access_token : token, is_new};
    }
}
