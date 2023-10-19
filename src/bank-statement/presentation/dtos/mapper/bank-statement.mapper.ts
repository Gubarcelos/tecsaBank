import { BankStatement } from "src/domain/model/bank-statement";
import { BankStatementDTO } from "../bank-statement.dto";
import { StatementDTO } from "../statement.dto";


export class BankStatementMapper {
    static toDTO(bankStatement: BankStatement[]): BankStatementDTO {
        const dto: BankStatementDTO = {
          accountNumber: '',
          mail : '',
          subject : 'EXTRATO BANCARIO',
          statement: [],
        };
    
        if (bankStatement) {
          dto.mail = bankStatement[0].checkingAccount?.user?.mail;
          dto.accountNumber = bankStatement[0].checkingAccount?.accountNumber || bankStatement[0].savingAccount?.accountNumber;
          dto.statement = bankStatement.map((statement) => {
            const statementDTO: StatementDTO = {
              id: statement.id,
              description: statement.description,
              amount: statement.amount,
              type: statement.type,
              direction: statement.direction,
              createdAt: statement.createdAt,
            };
            return statementDTO;
          });
        }
    
        return dto;
      }
}
