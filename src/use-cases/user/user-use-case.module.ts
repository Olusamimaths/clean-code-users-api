import { Module } from '@nestjs/common';
import { UserUseCase } from './user.use-case';
import { DataServicesModule } from '@/services/data-services';
import { UserFactoryService } from './user-factory.service';
import { AvatarUseCaseModule } from '../avatar/avatar.module';
import { MailServicesModule } from '@/services/mail-services';
import { EventBusServicesModule } from '@/services/event-bus';
import { FileStorageModule } from '@/frameworks/file-storage/fs.module';

@Module({
  imports: [
    DataServicesModule,
    AvatarUseCaseModule,
    FileStorageModule,
    MailServicesModule,
    EventBusServicesModule,
  ],
  providers: [UserUseCase, UserFactoryService],
  exports: [UserUseCase, UserFactoryService],
})
export class UserUseCaseModule {}
