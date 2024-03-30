import { Module } from '@nestjs/common';
import { UserUseCase } from './user.use-case';
import { DataServicesModule } from '@/services/data-services';
import { UserFactoryService } from './user-factory.service';
import { AvatarUseCaseModule } from '../avatar/avatar.module';
import { FileStorageModule } from '@/lib/file-storage/fs.module';
import { MailServicesModule } from '@/services/mail-services';
import { EventBusServicesModule } from '@/services/event-bus';

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
