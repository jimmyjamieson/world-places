import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('World Places')
    .setDescription('Simple open source CRUD for managing world-places')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const server = await app.listen(4000);
  server.setTimeout(1800000); // 600,000=> 10Min, 1200,000=>20Min, 1800,000=>30Min
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
