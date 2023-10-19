import { BankStatementEntity } from "src/infra/data/entities/bank-statement.entity";
import { IBankStatementRepository } from "./interface/bank-statement.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BankStatement } from "src/domain/model/bank-statement";
import { Pagination, paginate } from "src/domain/interface/pagination.interface";

export class BankStatementRepository implements IBankStatementRepository {

  constructor(
    @InjectRepository(BankStatementEntity)
    private readonly bankStateRepo: Repository<BankStatementEntity>,
  ) { }
  create(st: BankStatement): Promise<BankStatement> {
    return this.bankStateRepo
      .createQueryBuilder()
      .insert()
      .into(BankStatementEntity)
      .values(st)
      .execute()
      .then((result) => result.raw);
  }
  async getByRangeDate(accountNumber: string, minDate: Date, maxDate: Date, page: number, size: number): Promise<Pagination<BankStatement>> {
    const qb = this.bankStateRepo.createQueryBuilder('bs')
      .leftJoinAndSelect('bs.savingAccount', 'savingAccount')
      .leftJoinAndSelect('savingAccount.user', 'savingAccountUser')
      .leftJoinAndSelect('bs.checkingAccount', 'checkingAccount')
      .leftJoinAndSelect('checkingAccount.user', 'checkingAccountUser')
      .where('bs.createdAt >= :minDate', { minDate })
      .andWhere('bs.createdAt <= :maxDate', { maxDate })
      .andWhere('savingAccount.accountNumber = :accountNumber OR checkingAccount.accountNumber = :accountNumber', { accountNumber });

    return paginate<BankStatement>(qb, page, size);
  }
  async getByAccount(accountNumber: string, page: number, size: number): Promise<Pagination<BankStatement>> {
    const qb = this.bankStateRepo.createQueryBuilder('bs');
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    qb
      .leftJoinAndSelect('bs.savingAccount', 'savingAccount')
      .leftJoinAndSelect('savingAccount.user', 'savingAccountUser')
      .leftJoinAndSelect('bs.checkingAccount', 'checkingAccount')
      .leftJoinAndSelect('checkingAccount.user', 'checkingAccountUser')
      .where('bs.createdAt >= :startDate', { startDate: threeMonthsAgo })
      .andWhere('savingAccount.accountNumber = :accountNumber OR checkingAccount.accountNumber = :accountNumber', { accountNumber });

    return paginate<BankStatement>(qb, page, size);
  }

}