import { BadRequestException, Injectable } from "@nestjs/common";
import { ISavingAccountRepository } from "../repository/interface/saving-account.repository.interface";
import { ISavingAccountService } from "./interface/saving-accoutn.service.interface";
import { SavingsAccount } from "src/domain/model/saving-accounts";
import { User } from "src/domain/model/user";
import { SavingAccountRepository } from "../repository/saving-account.repository";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class SavingsAccountService implements ISavingAccountService {
    constructor(
        private readonly accountRepo: SavingAccountRepository
    ) { }

    async createAccount(user: User, accountNumber: string): Promise<SavingsAccount> {
        const acc = new SavingsAccount(user, accountNumber);
        return this.accountRepo.create(acc);
    }

    async getAccount(accountNumber: string): Promise<SavingsAccount> {
        const account = await this.accountRepo.getByAccountNumber(accountNumber);
        if (account) {
            return account;
        } else {
            throw new BadRequestException('Conta não exsitente')
        }
    }

    async addFounds(
        account: SavingsAccount,
        amount: number
    ): Promise<SavingsAccount> {
        account.balance += amount;
        return await this.accountRepo.update(account);
    }

    async removeFounds(
        sourceAccount: SavingsAccount,
        amount: number
    ): Promise<SavingsAccount> {
        if (sourceAccount.balance < amount) {
            throw new BadRequestException('Saldo insuficiente');
        }

        sourceAccount.balance -= amount;
        return await this.accountRepo.update(sourceAccount);
    }

    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async handleinterestRate() {
        const accounts = await this.accountRepo.getAll();
        accounts.forEach(ac => {
            ac.accrueInterest();
            this.accountRepo.update(ac);
        })
    }

}