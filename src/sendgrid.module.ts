import { Injectable, Logger, LoggerService, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService, MailDataRequired } from '@sendgrid/mail';

export interface ISendMailOptions {
  to: string;
  text: string;
  subject: string;
}

@Injectable()
export class SendgridService {
  private mailService: MailService = new MailService();
  private logger: LoggerService = new Logger();
  private appName = this.configService.get<string>('APP_NAME');
  private companyMail = this.configService.get<string>('COMPANY_MAIL');

  constructor(private readonly configService: ConfigService) {
    this.mailService.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  public async sendMail(mailOptions: ISendMailOptions): Promise<void> {
    const { to, subject, text } = mailOptions;
    const sendGridMailOption: MailDataRequired = { from: { name: this.appName, email: this.companyMail }, to, subject, text };
    const transport = await this.mailService.send(sendGridMailOption);
    this.logger.log(`Email successfully dispatched to ${mailOptions.to}`);
    this.logger.log(transport);
  }
}

@Module({
  providers: [SendgridService],
  exports: [SendgridService],
})
export class SendGridModule {}
