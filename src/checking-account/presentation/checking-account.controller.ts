import { Controller, Get, Param, Post, Body, Res } from '@nestjs/common';
import { CheckingAccountService } from '../service/checking-account.impl.service';
import { MapTo } from './mapper/mapTo';
import { Response } from 'express';

@Controller('checking-accounts')
export class CheckingAccountController {
  constructor(private readonly checkingAccountService: CheckingAccountService) {}

  @Get(':number')
  async getCheckingAccountInfo(@Param('number') ccNumber: string,@Res() res : Response) {
    const account = await this.checkingAccountService.getAccount(ccNumber);
    const checkingAccountInfo =  MapTo.toDTO(account) ;
    return res.json(checkingAccountInfo);
  }

  @Post(':id/enable-overdraft')
  async enableOverdraft(@Param('id') id: string, @Body('maxLimit') maxLimit: number, @Res() res: Response) {
    const account = await this.checkingAccountService.enableOverdraft(id, maxLimit);
    const checkingAccountInfo = MapTo.toDTO(account);
    return res.json(checkingAccountInfo);
  }

  @Post(':id/increase-overdraft-limit')
  async increaseOverdraftLimit(@Param('id') id: string, @Body('additionalLimit') additionalLimit: number, @Res() res: Response) {
    const account = await this.checkingAccountService.increaseOverdraftLimit(id, additionalLimit);
    const checkingAccountInfo = MapTo.toDTO(account);
    return res.json(checkingAccountInfo);
  }

}