import { Controller, Get, Param, Post, Query, Res, UseGuards } from "@nestjs/common";
import { BankStatementService } from "../service/bank-statement.service";
import { Pagination } from "src/domain/interface/pagination.interface";
import { BankStatement } from "src/domain/model/bank-statement";
import { Response } from "express";
import { BankStatementMapper } from "./dtos/mapper/bank-statement.mapper";
import { QueueService } from "src/mail/queue.service";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('BankStatement')
// @UseGuards(AuthGuard)
@Controller('bank-statements')
export class BankStatementController {
  constructor(
    private readonly bankStatementService: BankStatementService,
    private readonly queueService : QueueService
    ) {}


  @ApiOperation({ summary: 'Get bank statements by date range' })
  @Get('by-range-date')
  async getBankStatementsByRangeDate(
    @Query('accountNumber') accountNumber: string,
    @Query('minDate') minDate: string,
    @Query('maxDate') maxDate: string,
    @Query('page') page: number,
    @Query('size') size: number,
    @Res() res: Response,
  ) {
    const parsedMinDate = new Date(minDate);
    const parsedMaxDate = new Date(maxDate);

    const pagination: Pagination<BankStatement> = await this.bankStatementService.getByRangeDate(
      accountNumber,
      parsedMinDate,
      parsedMaxDate,
      page,
      size,
    );

    res.header('X-Total-Count', pagination.totalItems.toString());
    res.header('X-Page-Count', pagination.pageCount.toString());
    res.header('X-Current-Page', pagination.currentPage.toString());
    res.header('X-Per-Page', pagination.itemsPerPage.toString());
    if(pagination.items.length < 1) {
      return res.status(200).json(pagination.items)
    }

    return res.status(200).json(BankStatementMapper.toDTO(pagination.items));
  }

  @Get('by-account')
  async getBankStatementsByAccount(
    @Query('accountNumber') accountNumber: string,
    @Query('page') page: number,
    @Query('size') size: number,
    @Res() res: Response,
  ) {
    const pagination: Pagination<BankStatement> = await this.bankStatementService.getByAccount(
      accountNumber,
      page,
      size,
    );

    res.header('X-Total-Count', pagination.totalItems.toString());
    res.header('X-Page-Count', pagination.pageCount.toString());
    res.header('X-Current-Page', pagination.currentPage.toString());
    res.header('X-Per-Page', pagination.itemsPerPage.toString());

    if(pagination.items.length < 1) {
      return res.status(200).json(pagination.items)
    }

    return res.status(200).json(BankStatementMapper.toDTO(pagination.items));
  }

  @Post('send-email')
  async sendBankStatementByEmail(
    @Query('accountNumber') accountNumber: string,
    @Query('page') page: number,
    @Query('size') size: number,
    @Res() res: Response,
  ) {
    const pagination: Pagination<BankStatement> = await this.bankStatementService.getByAccount(
      accountNumber,
      page,
      size,
    );

    try {
      if(pagination.items.length < 1 ) {
        return res.status(200).json({ message: 'conta não possui extratos' });
              
      }
      await this.bankStatementService.sendMail(BankStatementMapper.toDTO(pagination.items));
      return res.status(200).json({ message: 'E-mail de extratos bancários enviado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao enviar o e-mail de extratos bancários.' });
    }
  }

  
}
