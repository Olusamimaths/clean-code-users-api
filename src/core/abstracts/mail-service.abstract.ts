export abstract class IMailService {
  abstract sendEmail(data: any): Promise<any>;
}

export interface IMailBody {
  to: string;
  subject: string;
  text: string;
}
