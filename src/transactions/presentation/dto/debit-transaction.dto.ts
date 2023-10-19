import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TransactionType } from "src/domain/model/enums/transation-type.enum";

export class CreateDebitTransactionDto {
    @IsString()
    @IsNotEmpty()
    sourceAccountNumber: string;

    @IsString()
    description : string = TransactionType.DEBIT;
  
    @IsEnum(TransactionType)
    type: TransactionType = TransactionType.DEBIT;

    @IsNumber()
    @IsNotEmpty()
    amount: number;


}