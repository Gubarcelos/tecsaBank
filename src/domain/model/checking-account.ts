import { BankAccount } from "./bank-account";
import { BankStatement } from "./bank-statement";
import { User } from "./user";

export class CheckingAccount extends BankAccount{

    isOverdraftAllowed: boolean;
    maxLimit : number;
    user: User;
    statement: BankStatement[];

    constructor(user : User) {
      super();
      this.user = user;
      this.accountNumber = generateAccountNumber();
      this.agency = '0001';
      this.balance = 0;
      this.pixKey = null;
      this.isOverdraftAllowed = false;
      this.maxLimit = 0;
      this.statement = []
    }

  }

  const generateAccountNumber = () =>   {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }