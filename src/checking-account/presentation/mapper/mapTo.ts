import { CheckingAccount } from "src/domain/model/checking-account";
import { AccountDTO } from "../dto/account.dto";
import { SavingsAccount } from "src/domain/model/saving-accounts";


export class MapTo {
  public static toDTO(checkingAccount: CheckingAccount | SavingsAccount): AccountDTO {
    const checkingAccountDTO = new AccountDTO();
    checkingAccountDTO.id = checkingAccount.id;
    checkingAccountDTO.agency = checkingAccount.agency;
    checkingAccountDTO.accountNumber = checkingAccount.accountNumber;
    checkingAccountDTO.balance = checkingAccount.balance;
    checkingAccountDTO.pixKey = checkingAccount.pixKey;
    checkingAccountDTO.statement = checkingAccount.statement;

    return checkingAccountDTO;
  }
}