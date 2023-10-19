import { User } from "./User";
import { BankStatement } from "./bank-statement";

export class BankAccount {
    id : string;
    agency : string;
    accountNumber: string;
    balance: number;
    user: User;
    pixKey : string; 
    statement : BankStatement [];
}