import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from './environment/config/env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = environments.port;
  await app.listen(port);
}
bootstrap();
