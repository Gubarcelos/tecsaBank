import { SavingsAccount } from "src/domain/model/saving-accounts";
import { User } from "src/domain/model/user";

export interface ISavingAccountService {
    createAccount(user : User, accountNumber : string) : Promise<SavingsAccount>;
    getAccount(accountNumber : string) : Promise<SavingsAccount>;
    addFounds(
        account: SavingsAccount,
        amount: number
    ): Promise<SavingsAccount> ;

    removeFounds(
        account: SavingsAccount,
        amount: number
        ): Promise<SavingsAccount>;
}