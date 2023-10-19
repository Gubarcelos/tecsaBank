import { IsEmail, IsString } from "class-validator";
import { AccountDTO } from "src/checking-account/presentation/dto/account.dto";
import { IsCpf } from "src/domain/decorators/is-cpf.decorator";

export class UserDTO {
    @IsString()
    id : string;
    @IsString()
    name: string;
  
    @IsCpf()
    cpf: string;
  
    @IsEmail()
    mail: string;

    savingAccount : AccountDTO;
    checkingAccount : AccountDTO;
}