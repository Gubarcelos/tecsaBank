import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreatedAccountDto } from 'src/service/dto/created-account.dto';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {}
    

    async sendEmail(dto: any, template: string) {
      const { mail, subject, ...data } = dto.mailTransfer || dto.bankStatementDTO || dto.any
  
      await this.mailerService.sendMail({
        to: mail,
        subject,
        template,
        context: data,
      });
    }

    async createAccountMail (dto: CreatedAccountDto, template: string) {
      const {  subject,mail, ...data } = dto;
      await this.mailerService.sendMail({
        to: mail,
        subject,
        template,
        context: data,
      });
    }
}
