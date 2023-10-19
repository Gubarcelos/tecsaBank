import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './infra/data/database.module';
import { ServiceModule } from './service/service.module';
import { UserModule } from './user/user.module';
import { SavingAccountModule } from './saving-account/saving-account.module';
import { CheckingAccountModule } from './checking-account/checking-account.module';
import { BankStatementModule } from './bank-statement/bank-statement.module';
import { TransactionModule } from './transactions/transactions.module';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ConfigModule.forRoot(),
    DataBaseModule,
    forwardRef(() => UserModule),
    SavingAccountModule,
    CheckingAccountModule,
    ServiceModule,
    BankStatementModule,
    TransactionModule,
    MailModule,
    ScheduleModule.forRoot()

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
