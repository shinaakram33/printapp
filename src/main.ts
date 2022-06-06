import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import * as dotenv from 'dotenv';
dotenv.config();

import { AppModule } from './app.module';

async function bootstrap () {
  const app: INestApplication = await NestFactory.create(AppModule);
  console.warn(process.env.API_VERSION)
  const apiPrefix: string = `/api/${process.env.API_VERSION}`;
  const apiValidationPipes: ValidationPipe =  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: { enableImplicitConversion: true },
  });

  app.enableCors({ origin: process.env.FRONTEND_URL, credentials: true });
  app.setGlobalPrefix(apiPrefix);
  app.enableCors();
  app.useGlobalPipes(apiValidationPipes);

  const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Print App Backend')
    .setDescription('Print app backend - NestJS')
    .setVersion('0.0.1')
    .addServer(apiPrefix)
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, options));

  await app.listen(Number(process.env.PORT) || 3000);
}

bootstrap();
