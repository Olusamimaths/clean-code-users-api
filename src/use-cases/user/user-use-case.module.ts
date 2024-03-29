import { Module } from '@nestjs/common';
import { UserUseCase } from './user.use-case';
import { DataServicesModule } from '@/services/data-services/data-services.module';
import { UserFactoryService } from './user-factory.service';

@Module({
  imports: [DataServicesModule],
  providers: [UserUseCase, UserFactoryService],
  exports: [UserUseCase, UserFactoryService],
})
export class UserUseCaseModule {}
