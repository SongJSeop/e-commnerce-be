import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) {}

    async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const hash: string = await bcrypt.hash(authCredentialsDto.password, 10);
        authCredentialsDto.password = hash;
        return this.userRepository.createUser(authCredentialsDto);
    }

    async deleteUserById(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
