import { CheckingAccount } from "./checking-account";
import { TransactionDirection } from "./enums/transation-direction";
import { TransactionType } from "./enums/transation-type.enum";
import { SavingsAccount } from "./saving-accounts";


export class BankStatement {

    id : string;
    description: string;
    amount: number;
    type: TransactionType;
    direction?: TransactionDirection;
    createdAt?: Date = new Date();
    savingAccount ?: SavingsAccount;
    checkingAccount ?: CheckingAccount
}