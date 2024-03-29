import { Module } from '@nestjs/common';
import { MongoDataServicesService } from './mongo-data-services.service';
import { IDataService } from '@/core/abstracts';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
  ],
  providers: [
    {
      provide: IDataService,
      useClass: MongoDataServicesService,
    },
  ],
  exports: [IDataService],
})
export class MongoDataServicesModule {}
