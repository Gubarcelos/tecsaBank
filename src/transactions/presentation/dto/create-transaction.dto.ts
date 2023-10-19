import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TransactionType } from "src/domain/model/enums/transation-type.enum";

export class CreateTransactionDto {
    @IsString()
    @IsOptional()
    sourceAccountNumber?: string;
  
    @IsString()
    @IsOptional()
    targetAccountNumber: string;
  
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    description : string
  
    @IsEnum(TransactionType)
    @IsOptional()
    type?: TransactionType;
}