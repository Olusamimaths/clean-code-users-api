import { IMailBody, IMailService } from '@/core/abstracts';

export class AWSSesMailer implements IMailService {
  async sendEmail(data: IMailBody) {
    console.log('Sending email with AWS SES: ', data);
    return data;
  }
}
