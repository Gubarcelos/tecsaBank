import { SavingsAccountEntity } from "src/infra/data/entities/saving-accounts.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SavingsAccount } from "src/domain/model/saving-accounts";
import { ICheckingAccountRepository } from "./interface/checking-account.respository.interface";
import { CheckingAccountEntity } from "src/infra/data/entities/checking-account.entity";
import { CheckingAccount } from "src/domain/model/checking-account";

export class CheckingAccountRepository implements ICheckingAccountRepository{

    constructor(
        @InjectRepository(CheckingAccountEntity)
        private readonly accountRepo: Repository<CheckingAccountEntity>,
      ) {}
    async create(cc: CheckingAccount): Promise<CheckingAccount> {
        return this.accountRepo.save(cc);
    }

    async getById(id : string) : Promise<CheckingAccount>  {
        const qb = this.accountRepo.createQueryBuilder('c');
        qb
        .leftJoinAndSelect('c.user', 'user')
        .where('c.id = :id', { id: id });
        const account = await qb.getOne();
        return account;
    }
    
    async getByAccountNumber(accountNumber: string): Promise<CheckingAccount> {
        const qb = this.accountRepo.createQueryBuilder('c');
        qb
        .leftJoinAndSelect('c.user', 'user')
        .where('c.accountNumber = :accountNumber', { accountNumber: accountNumber });
        const account = await qb.getOne();
        return account;
    }
    async update(cc: CheckingAccount): Promise<CheckingAccount> {
        return this.accountRepo.save(cc);
    }

    async getAll(): Promise<CheckingAccount[]> {
        const a = await this.accountRepo.find();
        return a;
    }

}