import { Module } from '@nestjs/common';
import { MongoDataServicesService } from './mongo-data-services.service';
import { IDataService } from '@/core/abstracts';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './model';
import { AvatarModel, AvatarSchema } from './model/avatar-model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: AvatarModel.name, schema: AvatarSchema },
    ]),
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
