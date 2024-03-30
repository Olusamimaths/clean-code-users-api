import { Module } from '@nestjs/common';
import { IMailService } from '@/core/abstracts';
import { AWSSesMailer } from './aws';

@Module({
  imports: [],
  providers: [
    {
      provide: IMailService,
      useClass: AWSSesMailer,
    },
  ],
  exports: [IMailService],
})
export class MailModule {}
