import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const hash: string = await bcrypt.hash(authCredentialsDto.password, 10);
        authCredentialsDto.password = hash;
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ token: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username };
            const token = this.jwtService.sign(payload);
            return { token };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }

    async deleteUserById(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
