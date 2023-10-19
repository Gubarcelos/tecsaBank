import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BankAccountEntity } from "./bank-account.entity";
import { UserEntity } from "./user.entity";
import { BankStatementEntity } from "./bank-statement.entity";

@Entity("savings_account")
export class SavingsAccountEntity extends BankAccountEntity {
  
  @Column({ type: "decimal", precision: 5, scale: 2 , default: 0.05})
  interestRate: number;

  @Column({ type: "datetime", nullable: true })
  lastInterestAccrual: Date;

  @OneToOne(() => UserEntity, user => user.savingAccount)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @OneToMany(() => BankStatementEntity, statement => statement.savingAccount)
  statement: BankStatementEntity[];

  accrueInterest(): void{}
}