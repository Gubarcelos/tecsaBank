import { BankAccount } from "src/domain/model/bank-account";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { BankAccountEntity } from "./bank-account.entity";
import { BankStatementEntity } from "./bank-statement.entity";
import { BoolBitTransformer } from "../utils/bool-bit-transformer";

@Entity("checking_account")
export class CheckingAccountEntity extends BankAccountEntity {

  @Column({ type: "bit",transformer: new BoolBitTransformer()})
  isOverdraftAllowed: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  maxLimit : number;

  @ManyToOne(() => UserEntity, user => user.checkingAccount)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @OneToMany(() => BankStatementEntity, statement => statement.checkingAccount)
  statement: BankStatementEntity[];
}