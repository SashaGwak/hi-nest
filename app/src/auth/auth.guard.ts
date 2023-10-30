import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const accessToken = this.extractTokenFromHeader(request);
        const refreshToken = this.extractRefreshTokenFromHeader(request);

        try {
            const payload = await this.jwtService.verifyAsync(accessToken, { secret: jwtConstants.secret });
            request['user'] = payload;
            return true;
        } catch (error) {
            if (refreshToken != undefined) {
            // if (error.name === 'TokenExpiredError' && refreshToken != undefined) {
                const {access_token} = await this.authService.refreshAccessToken(refreshToken);
                const payload = await this.jwtService.verifyAsync(access_token, { secret: jwtConstants.secret });
                request['token'] = access_token;
                request['user'] = payload;
                return true;
            } else {
                throw new UnauthorizedException('Invalid token');
            }
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private extractRefreshTokenFromHeader(request: Request): string | undefined {
        const token = request.headers.refreshtoken;
        return token ? token.toString() : undefined;
    }
}
