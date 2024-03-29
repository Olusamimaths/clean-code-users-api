import { Module } from '@nestjs/common';
import { AvatarFactoryService } from './avatar-factory.service';

@Module({
  providers: [AvatarFactoryService],
  exports: [AvatarFactoryService],
})
export class AvatarUseCaseModule {}
