import { CheckingAccount } from "../model/checking-account";
import { SavingsAccount } from "../model/saving-accounts";

export interface TransferResult {
    sourceAccountCC?: CheckingAccount;
    targetAccountCC?: CheckingAccount;
    sourceAccountCP?: SavingsAccount;
    targetAccountCP?: SavingsAccount;
}