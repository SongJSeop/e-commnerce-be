import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [TypeOrmModule.forRoot(typeORMConfig), BoardModule, AuthModule],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
