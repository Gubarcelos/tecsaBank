import { Body, Injectable } from "@nestjs/common";
import { BankStatementService } from "src/bank-statement/service/bank-statement.service";
import { SavingsAccountService } from "src/saving-account/service/saving-account.impl.service";
import { CreateTransactionDto } from "../presentation/dto/create-transaction.dto";
import { CheckingAccountService } from "src/checking-account/service/checking-account.impl.service";
import { TransactionDirection } from "src/domain/model/enums/transation-direction";

import { TransactionType } from "src/domain/model/enums/transation-type.enum";
import { CreateDebitTransactionDto } from "../presentation/dto/debit-transaction.dto";
import { CreateExternalTransactionDto } from "../presentation/dto/external-tranfer.dto";
import { ITransfer } from "src/domain/interface/transfer.interface";
import { QueueService } from "src/mail/queue.service";

@Injectable()
export class TransactionService {
  constructor(
    private readonly bankStatementService: BankStatementService,
    private readonly checkingAccoutService: CheckingAccountService,
    private readonly savingAccountService: SavingsAccountService,
    private readonly queueService : QueueService
  ) { }


  async createTranfer(dto: CreateTransactionDto): Promise<void> {

    const regex = /-500$/;
    let sourceAccount;
    let targetAccout;
    const amount = Math.round(dto.amount * 100) / 100;
    let mailTransfer : ITransfer;
    switch (true) {
      case regex.test(dto.sourceAccountNumber):
        sourceAccount = await this.savingAccountService.getAccount(dto.sourceAccountNumber);
        sourceAccount = await this.savingAccountService.removeFounds(sourceAccount, amount);
        this.bankStatementService.addCPTransaction(dto.type, amount, sourceAccount, dto.description, TransactionDirection.EXIT);
        mailTransfer = {
          mail : sourceAccount.user.mail,
          subject : "TRANFERENCIA REALIZADA",
          transferType : dto.type,
          accountNumber : sourceAccount.accountNumber,
          amount : amount,
          description : dto.description,
          direction : TransactionDirection.EXIT
        }
        this.queueService.enqueue({template :'transfer', mailTransfer  })
        break;
      default:
        sourceAccount = await this.checkingAccoutService.getAccount(dto.sourceAccountNumber);
        sourceAccount = await this.checkingAccoutService.removeFounds(sourceAccount, amount);
        this.bankStatementService.addCCTransaction(dto.type, amount, sourceAccount, dto.description, TransactionDirection.EXIT);
        mailTransfer = {
          mail : sourceAccount?.user?.mail,
          subject : "TRANFERENCIA REALIZADA",
          transferType : dto.type,
          accountNumber : sourceAccount.accountNumber,
          amount : amount,
          description : dto.description,
          direction : TransactionDirection.EXIT
        }
        this.queueService.enqueue({template :'transfer', mailTransfer  })
        break;
    }

    if (dto.type != TransactionType.EXTERNAL_TRANSFER) {
      switch (true) {
        case regex.test(dto.targetAccountNumber):
          targetAccout = await this.savingAccountService.getAccount(dto.targetAccountNumber);
          targetAccout = await this.savingAccountService.addFounds(targetAccout, amount);
          this.bankStatementService.addCPTransaction(dto.type, amount, sourceAccount, dto.description, TransactionDirection.EXIT);
          mailTransfer = {
            mail : targetAccout.user.mail,
            subject : "TRANFERENCIA REALIZADA",
            transferType : dto.type,
            accountNumber : targetAccout.accountNumber,
            amount : amount,
            description : dto.description,
            direction : TransactionDirection.EXIT
          }
          this.queueService.enqueue({template :'transfer', mailTransfer  })
          break;
        default:
          targetAccout = await this.checkingAccoutService.getAccount(dto.targetAccountNumber);
          targetAccout = await this.checkingAccoutService.addFounds(targetAccout, amount);
          this.bankStatementService.addCCTransaction(dto.type, amount, targetAccout, dto.description, TransactionDirection.ENTRY);
          mailTransfer = {
            mail : targetAccout.user.mail,
            subject : "TRANFERENCIA RECEBIDA",
            transferType : dto.type,
            accountNumber : targetAccout.accountNumber,
            amount : amount,
            description : dto.description,
            direction : TransactionDirection.ENTRY
          }
          this.queueService.enqueue({template :'transfer', mailTransfer  })
          break;
      }

    }

  }

  async debitCard(dto: CreateDebitTransactionDto): Promise<void> {
    let sourceAccount = await this.checkingAccoutService.getAccount(dto.sourceAccountNumber);
    sourceAccount = await this.checkingAccoutService.removeFounds(sourceAccount, dto.amount);
    this.bankStatementService.addCCTransaction(dto.type, dto.amount, sourceAccount, dto.description, TransactionDirection.EXIT);
    let mailTransfer : ITransfer;
    mailTransfer = {
      mail : sourceAccount.user.mail,
      subject : "PAGAMENTO DEBTO",
      transferType : dto.type,
      accountNumber : sourceAccount.accountNumber,
      amount : dto.amount,
      description : dto.description,
      direction : TransactionDirection.EXIT
    }
    this.queueService.enqueue({template :'transfer', mailTransfer  })

  }

  async deposit(dto: CreateTransactionDto) {
    let sourceAccount = await this.checkingAccoutService.getAccount(dto.sourceAccountNumber);
    sourceAccount = await this.checkingAccoutService.addFounds(sourceAccount, dto.amount);
    this.bankStatementService.addCCTransaction(TransactionType.DEPOSIT, dto.amount, sourceAccount, dto.description, TransactionDirection.ENTRY);

    let mailTransfer : ITransfer;
    mailTransfer = {
      mail : sourceAccount.user.mail,
      subject : "DEPOSITO",
      transferType : dto.type,
      accountNumber : sourceAccount.accountNumber,
      amount : dto.amount,
      description : dto.description,
      direction : TransactionDirection.ENTRY
    }
    this.queueService.enqueue({template :'transfer', mailTransfer  })
  }

  async externalTranfer(dto: CreateExternalTransactionDto) {
    let targetAccout = await this.checkingAccoutService.getAccount(dto.targetAccountNumber);
    targetAccout = await this.checkingAccoutService.addFounds(targetAccout, dto.amount);
    const desc = `banco : ${dto.bank}, conta : ${dto.sourceAccountNumber}, agencia : ${dto.sourceAgency}`
    this.bankStatementService.addCCTransaction(TransactionType.EXTERNAL_TRANSFER, dto.amount, targetAccout, desc, TransactionDirection.ENTRY);
    let mailTransfer : ITransfer;
    mailTransfer = {
      mail : targetAccout.user.mail,
      subject : "TRANSFERENCIA DE OUTRO BANCO",
      transferType : dto.type,
      accountNumber : targetAccout.accountNumber,
      amount : dto.amount,
      description : desc,
      direction : TransactionDirection.ENTRY
    }
    this.queueService.enqueue({template :'transfer', mailTransfer  })
  }

}