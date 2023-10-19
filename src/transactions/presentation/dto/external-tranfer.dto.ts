import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TransactionType } from "src/domain/model/enums/transation-type.enum";

export class CreateExternalTransactionDto { 
    @IsString()
    @IsOptional()
    sourceAccountNumber?: string;

    @IsString()
    @IsOptional()
    sourceAgency : string;

    @IsString()
    @IsOptional()
    bank : string;
    @IsString()
    targetAccountNumber: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    description : string;
    
    @IsEnum(TransactionType)
    @IsOptional()
    type?: TransactionType;
}