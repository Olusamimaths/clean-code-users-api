import { Module } from '@nestjs/common';
import { FileStorage } from './fs';
import { IFileStorage } from '@/core/abstracts';

@Module({
  providers: [
    {
      provide: IFileStorage,
      useClass: FileStorage,
    },
  ],
  exports: [IFileStorage],
})
export class FileStorageModule {}
