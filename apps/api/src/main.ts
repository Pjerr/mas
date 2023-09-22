import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import supertokens from 'supertokens-node';
import { AuthExceptionFilter } from './modules/auth/auth-exception.filter';
import { errorHandler, middleware } from 'supertokens-node/framework/express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('VMS Api')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => {
      const entityName = controllerKey.replace('Controller', '');
      return `${methodKey}${entityName}`;
    },
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('docs', app, document);

  await app.get(MikroORM).getMigrator().up();

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: [
      'GET',
      'POST',
      'PATCH',
      'PUT',
      'DELETE',
      'OPTIONS',
      'content-type',
      ...supertokens.getAllCORSHeaders(),
    ],
    credentials: true,
  });

  app.use(middleware());

  app.use(errorHandler());

  app.useGlobalFilters(new AuthExceptionFilter());

  app.enableShutdownHooks();

  await app.listen(4000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
