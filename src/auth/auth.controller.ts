import {
    Controller,
    Body,
    Get,
    Post,
    ValidationPipe,
    Delete,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.authService.getUsers();
    }

    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ token: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Delete('/:id')
    deleteUserById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<DeleteResult> {
        return this.authService.deleteUserById(id);
    }
}
