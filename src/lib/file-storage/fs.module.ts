import { Module } from '@nestjs/common';
import { FileStorage } from './fs';

@Module({
  providers: [FileStorage],
  exports: [FileStorage],
})
export class FileStorageModule {}
