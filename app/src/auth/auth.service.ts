import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2 } from 'crypto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService,
    ) {}

    async signIn(id: string, pass:string): Promise<any> {
        try {
            const user = await this.userService.findUser(id);
      
            if (!user) {
              throw new UnauthorizedException();
            }
      
            return new Promise((resolve, reject) => {

                pbkdf2(pass, user.salt, 97362, 64, 'sha512', async (err, key) => {

                    if (err) {
                        reject(err);
                    } else if ( key.toString('base64') === user.password && user.is_possible == 1 ) {
                        const accessPayload = { sub: user.admin_id, email: user.email, name: user.name, is_god: user.is_god };
                        const refreshPayload = { sub: user.admin_id, email: user.email };

                        const refresh_token = this.jwtService.sign(refreshPayload, {
                            expiresIn: '7d',
                        });
                        const access_token = this.jwtService.sign(accessPayload);

                        const tokenUpdate = await this.userService.updateToken(refresh_token, user.admin_id);

                        resolve({ access_token, refresh_token });
                    } else {
                        reject(new UnauthorizedException());
                    }
                });
            });

        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    async refreshAccessToken(refresh_token: string): Promise<any> {
        try {
            const payload = await this.jwtService.verifyAsync(refresh_token, { secret: jwtConstants.secret });
            const user = await this.userService.findUser(payload.email);
            const dbRefreshToken = user?.refresh_token;

            if (!dbRefreshToken || !user || !(refresh_token == dbRefreshToken)) {
                throw new UnauthorizedException();
            }
        
            const accessPayload = { sub: user.admin_id, email: user.email, name: user.name, is_god: user.is_god };
            const newAccessToken = this.jwtService.sign(accessPayload);

            return {
                access_token: newAccessToken,
            };
            
        } catch (error) {
          throw new UnauthorizedException();
        }
    }
}

