import { IMailBody, IMailService } from '@/core/abstracts';

export class SendGridMailer implements IMailService {
  async sendEmail(data: IMailBody) {
    console.log('Sending email with SendGrid: ', data);
    return data;
  }
}
