import { Body, Controller, Post, Res } from "@nestjs/common";
import { TransactionService } from "../service/transaction.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Response } from "express";
import { CreateDebitTransactionDto } from "./dto/debit-transaction.dto";
import { CreateExternalTransactionDto } from "./dto/external-tranfer.dto";

@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService
    ) { }

    @Post('transfer')
    async createTranfer(
        @Body() payload: CreateTransactionDto,
        @Res() res: Response
    ) {
        await this.transactionService.createTranfer(payload);
        return res.send("tranferencia realizada com sucesso");
    }

    @Post('debit')
    async createDebitTransaction(
        @Body() payload: CreateDebitTransactionDto,
        @Res() res: Response
    ) {
        await this.transactionService.debitCard(payload);
        return res.send("compra aprovada");
    }

    @Post('deposit')
    async createDepositTransaction(
        @Body() payload: CreateTransactionDto,
        @Res() res: Response
    ) {
        await this.transactionService.deposit(payload);
        return res.send("cdeposito recebido");
    }

    @Post('external-tranfer')
    async createExternalTransaction(
        @Body() payload: CreateExternalTransactionDto,
        @Res() res: Response
    ) {
        await this.transactionService.externalTranfer(payload);
        return res.send("Recebeu tranferencia");
    }
}