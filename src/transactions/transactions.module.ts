import { Module } from "@nestjs/common";
import { SavingAccountModule } from "src/saving-account/saving-account.module";
import { CheckingAccountModule } from "src/checking-account/checking-account.module";
import { BankStatementModule } from "src/bank-statement/bank-statement.module";
import { TransactionService } from "./service/transaction.service";
import { TransactionController } from "./presentation/transactions.controller";
import { MailModule } from "src/mail/mail.module";


@Module({
  imports: [SavingAccountModule, MailModule,CheckingAccountModule,BankStatementModule],
  providers : [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}