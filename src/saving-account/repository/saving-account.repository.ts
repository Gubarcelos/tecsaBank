import { SavingsAccountEntity } from "src/infra/data/entities/saving-accounts.entity";
import { ISavingAccountRepository } from "./interface/saving-account.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SavingsAccount } from "src/domain/model/saving-accounts";

export class SavingAccountRepository implements ISavingAccountRepository{

    constructor(
        @InjectRepository(SavingsAccountEntity)
        private readonly accountRepo: Repository<SavingsAccountEntity>,
      ) {}


    async create(cp: SavingsAccount): Promise<SavingsAccount> {
        return this.accountRepo.save(cp);
    }
    async getByAccountNumber(accountNumber: string): Promise<SavingsAccount> {
        const qb = this.accountRepo.createQueryBuilder('c');
        qb
        .leftJoinAndSelect('c.user', 'user')
        .where('c.accountNumber = :accountNumber', { accountNumber: accountNumber });
        const account = await qb.getOne();
        return account;
    }
    async update(cp : SavingsAccount): Promise<SavingsAccount> {
        return this.accountRepo.save(cp);
    }

    async getAll(): Promise<SavingsAccount[]> {
        return await this.accountRepo.find();
    }


}