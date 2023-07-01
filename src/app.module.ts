import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environment/config/env-config';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule,
    FeaturesModule,
    SharedModule,
    MongooseModule.forRoot(environments.mongoUri, {
      autoIndex: false
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: ExceptionsFilter,
    // },
  ],
})
export class AppModule { }
