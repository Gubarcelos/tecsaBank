import { Column,PrimaryGeneratedColumn } from "typeorm";


export class BankAccountEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name : "agency", type : "varchar", })
    agency: string;

    @Column({name : "accoutNumber", type : "varchar", length : 25 })
    accountNumber: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    balance: number;

    @Column({nullable : true, default : null})
    pixKey: string;


}