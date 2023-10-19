import { BankAccount } from "./bank-account";
import { BankStatement } from "./bank-statement";
import { User } from "./user";

export class SavingsAccount extends BankAccount {

  interestRate: number;
  lastInterestAccrual: Date;
  user: User;
  statement: BankStatement[];

  constructor(user: User, accountNumber: string) {
    super();
    this.user = user;
    this.accountNumber = accountNumber + '-500';
    this.agency = '0001';
    this.balance = 0;
    this.pixKey = null;
    this.interestRate = 0.05;
    this.lastInterestAccrual = new Date();
    this.statement = [];
  }


  accrueInterest(): void {
    const currentDate = new Date();
    const daysSinceLastAccrual = Math.floor((currentDate.getTime() - this.lastInterestAccrual.getTime()) / (1000 * 3600 * 24));

    if (daysSinceLastAccrual < 30) {
      const interestAmount = this.balance * this.interestRate;
      this.balance += interestAmount;
      this.lastInterestAccrual = currentDate;
    }

  }
}

