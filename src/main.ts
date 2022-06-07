import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap () {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const apiPrefix: string = `/api/${configService.get('API_VERSION')}`;
  const apiValidationPipes: ValidationPipe =  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: { enableImplicitConversion: true },
  });
  const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('Print App Backend')
  .setDescription('Print app backend - NestJS')
  .setVersion('0.0.1')
  .addServer(apiPrefix)
  .addBearerAuth()
  .build();

  app.enableCors({ origin: configService.get('FRONTEND_URL'), credentials: true });
  app.setGlobalPrefix(apiPrefix);
  app.enableCors();
  app.useGlobalPipes(apiValidationPipes);

  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, options));

  await app.listen(Number(configService.get('PORT')) || 3000);
}

bootstrap();
