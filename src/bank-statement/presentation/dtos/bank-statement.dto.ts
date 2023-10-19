import { StatementDTO } from "./statement.dto";

export class BankStatementDTO { 
    accountNumber : string;
    mail ?: string;
    subject ?: string = 'EXTRATO BANCARIO'
    statement : StatementDTO [];
}