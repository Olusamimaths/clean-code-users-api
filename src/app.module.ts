import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AllExceptionsFilter } from './exception-filters';
import { getEnvFileName } from './config';
import { configuration, validationSchema } from '@config/index';
import { UserModule } from './use-cases/user/user.module';
import { DataServicesModule } from './services/data-services/data-services.module';
import { MongoDataServicesModule } from './frameworks/data-services/mongo/mongo-data-services.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFileName(),
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    DataServicesModule,
    MongoDataServicesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {}
