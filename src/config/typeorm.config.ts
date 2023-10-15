import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root', // DB 계정
    password: 'wns1254', // DB 비밀번호
    database: 'nest_test', // DB 스키마 이름
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
