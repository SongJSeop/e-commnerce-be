import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password }: AuthCredentialsDto = authCredentialsDto;
        const user: User = this.create({ username, password });

        try {
            return await user.save();
        } catch (error) {
            if (error.errno === 1062) {
                throw new ConflictException('Username Already Exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
