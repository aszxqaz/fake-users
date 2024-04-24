import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            whitelist: true,
        })
    );
    app.enableCors({
        origin: [
            'http://localhost:4200',
            'http://localhost',
            'http://127.0.0.1:4200',
        ],
    });
    const port = process.env.PORT || 8080;
    await app.listen(port);
}
bootstrap();
