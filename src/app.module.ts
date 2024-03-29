import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AllExceptionsFilter } from './exception-filters';
import { getEnvFileName } from './config';
import { configuration, validationSchema } from '@config/index';
import { UserUseCaseModule } from '@/use-cases/user/';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '@/controllers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFileName(),
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserUseCaseModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {}
