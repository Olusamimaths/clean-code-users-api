import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '@/frameworks/data-services/mongo';

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule {}
