import { Body, Controller, Post, Res } from "@nestjs/common";
import { CreateNewDTO } from "./dto/create-new.dto";
import { Response } from "express";
import { SavingsAccountService } from "src/saving-account/service/saving-account.impl.service";
import { CheckingAccountService } from "src/checking-account/service/checking-account.impl.service";
import { UserService } from "src/user/services/user.impl.service";
import { MailService } from "src/mail/mail.service";
import { CreatedAccountDto } from "./dto/created-account.dto";

@Controller('service')
export class ServiceController {
    constructor(
        private readonly userService: UserService,
        private readonly cpService: SavingsAccountService,
        private readonly ccService : CheckingAccountService,
        private readonly mailService: MailService,
      ) {}

      @Post('create-new')
      async createUserAndAccount(
        @Body() payload: CreateNewDTO,
        @Res() res : Response
      ) {

        const userResult = await this.userService.createUser(payload.name,payload.cpf,payload.mail);
        let emailData = new CreatedAccountDto() ;
        const newCCAccount = await this.ccService.createAccount(userResult.createdUser);
        emailData.checkingAccountNumber = newCCAccount.accountNumber;
        emailData.checkingAccountAmaount = newCCAccount.balance;
        emailData.mail = userResult.createdUser.mail
        emailData.subject = "conta criada com sucesso";
        emailData.numberPassword = userResult.randomPassword;
        emailData.cpf = newCCAccount.user.cpf;

        if(payload.createCpAccount) {
            const newCpAccount = await this.cpService.createAccount(userResult.createdUser, newCCAccount.accountNumber);
            emailData.savingAccountAmaount = newCpAccount.balance;
            emailData.savingAccountNumber = newCpAccount.accountNumber;
            this.mailService.createAccountMail(emailData,'account-created');
            return res.send("conta criada com sucesso");
        }
        this.mailService.createAccountMail(emailData,'account-created');
        return res.send("conta criada com sucesso");
      }
}