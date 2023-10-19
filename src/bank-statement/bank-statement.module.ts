import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataBaseModule } from "src/infra/data/database.module";
import { BankStatementEntity } from "src/infra/data/entities/bank-statement.entity";
import { BankStatementRepository } from "./repository/bank-statement.repository";
import { BankStatementService } from "./service/bank-statement.service";
import { BankStatementController } from "./presentation/bank-statements.controller";
import { MailModule } from "src/mail/mail.module";
import { AuthModule } from "src/infra/auth/auth.module";



@Module({
  imports: [AuthModule,DataBaseModule,MailModule,TypeOrmModule.forFeature([BankStatementEntity])],
  providers: [BankStatementRepository,BankStatementService],
  controllers : [BankStatementController],
  exports: [BankStatementService],
})
export class BankStatementModule {}