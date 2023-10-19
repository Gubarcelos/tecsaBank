import { CheckingAccount } from "src/domain/model/checking-account";

export interface ICheckingAccountRepository{
    create(cc : CheckingAccount) : Promise <CheckingAccount>;
    getByAccountNumber(accountNumber : string) : Promise <CheckingAccount>;
    update (cc : CheckingAccount) : Promise <CheckingAccount>;
    getById(id : string) : Promise<CheckingAccount>;
    getAll(): Promise<CheckingAccount[]>
}