import { Pagination } from "src/domain/interface/pagination.interface";
import { BankStatement } from "src/domain/model/bank-statement";

export interface IBankStatementRepository {
    create(st : BankStatement) : Promise<BankStatement>;
    getByRangeDate(accountNumber: string, minDate: Date, maxDate: Date, page: number, size: number): Promise<Pagination<BankStatement>>
    getByAccount(accountNumber: string, page: number, size: number): Promise<Pagination<BankStatement>>
}