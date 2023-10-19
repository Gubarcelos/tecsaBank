import { TransactionDirection } from "../model/enums/transation-direction";
import { TransactionType } from "../model/enums/transation-type.enum";

export interface ITransfer {
    transferType?: TransactionType;
    description : string;
    amount: number;
    accountNumber : string;
    direction : TransactionDirection;
    subject ?: string;
    mail : string;
}