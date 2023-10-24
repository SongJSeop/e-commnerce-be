import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) {}

    async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async deleteUserById(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
