import { IsNumber, IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { BankStatement } from 'src/domain/model/bank-statement';

export class AccountDTO {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    agency: string;

    @IsString()
    @IsNotEmpty()
    accountNumber: string;

    @IsNumber()
    @IsNotEmpty()
    balance: number;

    @IsString()
    @IsNotEmpty()
    pixKey?: string;

    @IsNumber()
    @IsOptional()
    maxLimit ?: number

    @IsArray()
    statement?: BankStatement[];
}