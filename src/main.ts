import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);
    const logger = new Logger('Main');

    const port = process.env.PORT;
    await app.listen(port);
    logger.log(`애플리케이션이 ${port}번 포트에서 시작되었습니다.`);
}
bootstrap();
