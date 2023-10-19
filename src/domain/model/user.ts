import { CheckingAccount } from "./checking-account";
import { SavingsAccount } from "./saving-accounts";

export class User{
    id : string;
    name : string;
    cpf : string;
    mail : string;
    numberPass : string;
    activated : boolean;
    savingAccount : SavingsAccount;
    checkingAccount : CheckingAccount
}