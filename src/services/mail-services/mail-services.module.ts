import { Module } from '@nestjs/common';
import { MailModule } from '@/frameworks/mailer';

@Module({
  imports: [MailModule],
  exports: [MailModule],
})
export class MailServicesModule {}
