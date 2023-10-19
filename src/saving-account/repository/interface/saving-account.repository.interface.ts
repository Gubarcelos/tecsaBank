import { SavingsAccount } from "src/domain/model/saving-accounts";

export interface ISavingAccountRepository{
    create(cp : SavingsAccount) : Promise <SavingsAccount>;
    getByAccountNumber(accountNumber : string) : Promise <SavingsAccount>;
    update (cp : SavingsAccount) : Promise <SavingsAccount>;
    getAll(): Promise<SavingsAccount[]>
    
}