import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserRepository) {
        super({
            secretOrKey: process.env.JWT_SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: { username: string }): Promise<User> {
        const { username }: Record<string, string> = payload;
        const user: User = await this.userRepository.findOneBy({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
