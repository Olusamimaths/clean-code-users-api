import { Module } from '@nestjs/common';
import { UserUseCase } from './user.use-case';
import { DataServicesModule } from '@/services/data-services/data-services.module';
import { UserFactoryService } from './user-factory.service';
import { AvatarUseCaseModule } from '../avatar/avatar.module';
import { FileStorageModule } from '@/lib/file-storage/fs.module';

@Module({
  imports: [DataServicesModule, AvatarUseCaseModule, FileStorageModule],
  providers: [UserUseCase, UserFactoryService],
  exports: [UserUseCase, UserFactoryService],
})
export class UserUseCaseModule {}
