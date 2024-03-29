import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '@/frameworks/data-services/mongo';
import { ReqresDataServicesModule } from '@/frameworks/data-services/reqres';

@Module({
  imports: [MongoDataServicesModule, ReqresDataServicesModule],
  exports: [MongoDataServicesModule, ReqresDataServicesModule],
})
export class DataServicesModule {}
