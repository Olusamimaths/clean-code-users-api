import { Injectable } from '@nestjs/common';
import { AWSSesMailer } from './aws';
import { IMailBody, IMailService } from '@/core/abstracts';

@Injectable()
export class EmailService implements IMailService {
  constructor(private readonly _mailerService: AWSSesMailer) {}

  public async sendEmail(data: IMailBody): Promise<any> {
    return await this._mailerService.sendEmail(data);
  }
}
