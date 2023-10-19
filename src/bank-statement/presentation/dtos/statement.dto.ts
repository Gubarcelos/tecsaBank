import { TransactionDirection } from "src/domain/model/enums/transation-direction";
import { TransactionType } from "src/domain/model/enums/transation-type.enum";

export class StatementDTO { 
    id : string;
    description: string;
    amount: number;
    type: TransactionType;
    direction?: TransactionDirection;
    createdAt?: Date = new Date();
}