import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CheckingAccountEntity } from "src/infra/data/entities/checking-account.entity";
import { SavingAccountModule } from "src/saving-account/saving-account.module";
import { UserModule } from "src/user/user.module";
import { CheckingAccountService } from "./service/checking-account.impl.service";
import { CheckingAccountRepository } from "./repository/checking-account.repository";
import { DataBaseModule } from "src/infra/data/database.module";
import { CheckingAccountController } from "./presentation/checking-account.controller";
import { BankStatementModule } from "src/bank-statement/bank-statement.module";


@Module({
  imports: [DataBaseModule,SavingAccountModule,BankStatementModule,TypeOrmModule.forFeature([CheckingAccountEntity])],
  providers: [CheckingAccountService,CheckingAccountRepository ],
  controllers : [CheckingAccountController],
  exports: [CheckingAccountService],
})
export class CheckingAccountModule {}