import { TransactionType } from "src/domain/model/enums/transation-type.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SavingsAccountEntity } from "./saving-accounts.entity";
import { CheckingAccountEntity } from "./checking-account.entity";
import { TransactionDirection } from "src/domain/model/enums/transation-direction";

@Entity("bank_statement")
export class BankStatementEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "description", type: "varchar", nullable: true, length: 255 })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number;

    @Column({ type: "enum", enum: TransactionType })
    type: TransactionType;

    @Column({ type: "enum", enum: TransactionDirection })
    direction: TransactionDirection;

    @Column({ type: "datetime" })
    createdAt: Date;

    @ManyToOne(() => SavingsAccountEntity, savingAccount => savingAccount.user)
    @JoinColumn({ name: "saving_account_id" })
    savingAccount : SavingsAccountEntity;

    @ManyToOne(() => CheckingAccountEntity, checkingAccount => checkingAccount.user)
    @JoinColumn({ name: "checkoing_account_id" })
    checkingAccount : CheckingAccountEntity
}