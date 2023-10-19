import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatedAccountDto {

    @IsString()
    @IsNotEmpty()
    checkingAccountNumber?: string;

    @IsNumber()
    @IsNotEmpty()
    checkingAccountAmaount?: number;

    @IsString()
    savingAccountNumber?: string;
    @IsNumber()
    savingAccountAmaount?: number;

    @IsString()
    @IsNotEmpty()
    numberPassword  ?: string;  
    
    @IsString()
    subject ?: string;
    

    @IsString()
    mail : string;

    @IsString()
    cpf : string;
    
}