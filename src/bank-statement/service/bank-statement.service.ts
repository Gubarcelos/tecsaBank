import { Injectable } from "@nestjs/common";
import { IBankStatementService } from "./interface/bank-statement.service.interface";
import { BankStatementEntity } from "src/infra/data/entities/bank-statement.entity";
import { BankStatement } from "src/domain/model/bank-statement";
import { CheckingAccount } from "src/domain/model/checking-account";
import { TransactionType } from "src/domain/model/enums/transation-type.enum";
import { SavingsAccount } from "src/domain/model/saving-accounts";
import { BankStatementRepository } from "../repository/bank-statement.repository";
import { TransactionDirection } from "src/domain/model/enums/transation-direction";
import { Pagination } from "src/domain/interface/pagination.interface";
import { QueueService } from "src/mail/queue.service";
import { BankStatementDTO } from "../presentation/dtos/bank-statement.dto";
import { error } from "console";

@Injectable()
export class BankStatementService implements IBankStatementService {
    constructor(
        private readonly statementRepo: BankStatementRepository,
        private readonly queueService: QueueService
    ) { }


    async addCPTransaction(transferType: TransactionType, amount: number, account: SavingsAccount, description: string, direction: TransactionDirection): Promise<void> {
        const transaction = new BankStatement();
        transaction.savingAccount = account
        transaction.type = transferType;
        transaction.amount = amount;
        transaction.description = description;
        await this.statementRepo.create(transaction)
    }
    async addCCTransaction(transferType: TransactionType, amount: number, account: CheckingAccount, description: string, direction: TransactionDirection): Promise<void> {
        const transaction = new BankStatement();
        transaction.checkingAccount = account
        transaction.type = transferType;
        transaction.amount = amount;
        transaction.description = description;
        this.statementRepo.create(transaction)
    }

    async getByRangeDate(accountNumber: string, minDate: Date, maxDate: Date, page: number = 1, size: number = 50): Promise<Pagination<BankStatement>> {
        const pg = await this.statementRepo.getByRangeDate(accountNumber, minDate, maxDate, page, size);
        return pg;
    }
    async getByAccount(accountNumber: string, page: number = 1, size: number = 50): Promise<Pagination<BankStatement>> {
        return await this.statementRepo.getByAccount(accountNumber, page, size)
    }

    async sendMail(bankStatementDTO: BankStatementDTO): Promise<void> {
        this.queueService.enqueue({ template: 'statement', bankStatementDTO })
    }


}