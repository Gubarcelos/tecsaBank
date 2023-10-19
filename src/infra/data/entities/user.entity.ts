import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SavingsAccountEntity } from "./saving-accounts.entity";
import { CheckingAccountEntity } from "./checking-account.entity";
import { BoolBitTransformer } from "../utils/bool-bit-transformer";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "name", type: "varchar", nullable: false })
    name: string;

    @Column({ name: "cpf", type: "varchar", nullable: false, unique: true, length: 11 })
    cpf: string;

    @Column({ name: "mail", type: "varchar", nullable: false, unique: true })
    mail: string;

    @Column({
        name: "number_password", type: "varchar", length: 255, nullable: false
    })
    numberPass: string;

    @Column({ name: "activated", default: true, type: "bit", nullable: false ,transformer: new BoolBitTransformer()})
    activated: boolean;

    @OneToOne(() => SavingsAccountEntity, savingAccount => savingAccount.user)
    savingAccount: SavingsAccountEntity;

    @OneToOne(() => CheckingAccountEntity, checkingAccount => checkingAccount.user)
    checkingAccount: CheckingAccountEntity
}