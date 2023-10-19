import { Injectable } from "@nestjs/common";
import { User } from "src/domain/model/user";
import { ICheckingAccountService } from "./interface/checking-account.service.interface";
import { CheckingAccount } from "src/domain/model/checking-account";
import { CheckingAccountRepository } from "../repository/checking-account.repository";
import { BadRequestException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CheckingAccountService implements ICheckingAccountService {
    constructor(
        private readonly accountRepo: CheckingAccountRepository,
      ) {}


    async createAccount(user: User): Promise<CheckingAccount> {
        const acc = new CheckingAccount(user);
        return this.accountRepo.create(acc);
    }

    async getAccount(accountNumber: string): Promise<CheckingAccount> {
        const account = await this.accountRepo.getByAccountNumber(accountNumber);
        if (account) {
            return account;
        }else {
            throw new BadRequestException('Conta não exsitente')
        }
    }

    async addFounds(
        account: CheckingAccount,
        amount: number
        ): Promise<CheckingAccount> {

            account.balance = parseFloat(account.balance.toString())
            account.balance += amount;
            return await this.accountRepo.update(account);
    }

    async removeFounds(
        sourceAccount: CheckingAccount,
        amount: number
        ): Promise<CheckingAccount> {

            if (sourceAccount.isOverdraftAllowed) {
                const bal = parseFloat(sourceAccount.balance.toString()) + parseFloat(sourceAccount.maxLimit.toString())
                if (bal < amount) {
                    throw new BadRequestException('Limite de cheque especial insuficiente');
                }
            } else {
                if (sourceAccount.balance < amount) {
                    throw new BadRequestException('Saldo insuficiente');
                }
            }

            sourceAccount.balance = parseFloat(sourceAccount.balance.toString())
            sourceAccount.balance -= amount;
            return await this.accountRepo.update(sourceAccount);
    }

    async enableOverdraft(id : string , maxLimit: number = 500.00): Promise<CheckingAccount> {
        const account = await this.accountRepo.getById(id);
        account.isOverdraftAllowed = true;
        account.maxLimit = maxLimit;
        return await this.accountRepo.update(account);
    }

    async increaseOverdraftLimit(id : string, additionalLimit: number): Promise<CheckingAccount> {
        const account = await this.accountRepo.getById(id);
        if (!account.isOverdraftAllowed) {
            throw new BadRequestException('Limite de cheque especial não permitido nesta conta');
        }
       const nLimit = parseFloat(account.maxLimit.toString()) + parseFloat(additionalLimit.toString());
       account.maxLimit = nLimit
        return await this.accountRepo.update(account);
    }

    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
    async handleOverdrafTax() {
      const accounts = await this.accountRepo.getAll();
      for(const ac of accounts) {
        if(ac.isOverdraftAllowed && parseFloat(ac.balance.toString()) < 0){
            const overdraftAmount = Math.abs(ac.balance) * 0.015;
            ac.balance -= overdraftAmount;
            const x = await this.accountRepo.update(ac);
            console.log(x)
        }
      }
    }


}