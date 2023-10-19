import { Pagination } from "src/domain/interface/pagination.interface";
import { BankStatement } from "src/domain/model/bank-statement";
import { CheckingAccount } from "src/domain/model/checking-account";
import { TransactionDirection } from "src/domain/model/enums/transation-direction";
import { TransactionType } from "src/domain/model/enums/transation-type.enum";
import { SavingsAccount } from "src/domain/model/saving-accounts";

export interface IBankStatementService {
     addCCTransaction(
        transferType: TransactionType,
        amount: number,
        account: CheckingAccount,
        description : string, 
        direction : TransactionDirection
        
    ): Promise<void>

    addCPTransaction(
        transferType: TransactionType,
        amount: number,
        account: SavingsAccount,
        description : string, 
        direction : TransactionDirection
    ): Promise<void>

    getByRangeDate(
        accountNumber: string,
        minDate: Date, 
        maxDate: Date,
        page : number,
        size : number
        ): Promise<Pagination<BankStatement>>;

    getByAccount(
        accountNumber : string,
        page : number,
        size : number
        ): Promise<Pagination<BankStatement>>;
}