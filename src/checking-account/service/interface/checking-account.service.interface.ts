
import { TransferResult } from "src/domain/interface/transfer-result.interface";
import { BankStatement } from "src/domain/model/bank-statement";
import { CheckingAccount } from "src/domain/model/checking-account";
import { TransactionType } from "src/domain/model/enums/transation-type.enum";
import { User } from "src/domain/model/user";

export interface ICheckingAccountService {
    createAccount(user : User) : Promise<CheckingAccount>;
    getAccount(accountNumber : string) : Promise<CheckingAccount>;
    addFounds(
        account: CheckingAccount,
        amount: number
    ): Promise<CheckingAccount> ;

    removeFounds(
        account: CheckingAccount,
        amount: number
        ): Promise<CheckingAccount>;
}