import { Controller, Get, Param, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SavingsAccountService } from '../service/saving-account.impl.service';
import { MapTo } from 'src/checking-account/presentation/mapper/mapTo';
import { IJwtPayload } from 'src/domain/interface/jwtPayload.interface';
import { UserT } from 'src/infra/auth/decorators/user.decorator';
import { User } from 'src/domain/model/User';
import { AuthGuard } from 'src/infra/auth/auth.guard';
import { CreatedAccountDto } from 'src/service/dto/created-account.dto';
import { MailService } from 'src/mail/mail.service';


@Controller('saving-accounts')
export class SavingAccountController {
  constructor(
    private readonly savingAccountService: SavingsAccountService,
    private readonly mailService : MailService
    ) {}


  @UseGuards(AuthGuard)
  @Post('create-saving')
  async createAccount(@UserT() usert: IJwtPayload,@Res() res : Response) {
    const user = new User();
    user.id = usert.id;
    user.mail = usert.mail;
    user.cpf = usert.cpf
    const accountCP = await  this.savingAccountService.createAccount(user,usert.accounts.checkingAccount.accountNumber);
    let emailData = new CreatedAccountDto();
    emailData.mail = accountCP.user.mail
    emailData.subject = "conta poupança criada com sucesso";
    emailData.cpf = accountCP.user.cpf;
    emailData.savingAccountAmaount = accountCP.balance;
    emailData.savingAccountNumber = accountCP.accountNumber;
    this.mailService.createAccountMail(emailData,'account-created');
    return res.send("conta poupança criada com sucesso")
  }
  @Get(':number')
  async getSavingAccountInfo(@Param('number') cpNumber: string,@Res() res : Response) {
    const account = await this.savingAccountService.getAccount(cpNumber);
    const checkingAccountInfo =  MapTo.toDTO(account) ;
    return res.json(checkingAccountInfo);
  }



}