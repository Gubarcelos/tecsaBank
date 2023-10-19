import { MiddlewareConsumer, Module, NestModule, forwardRef } from '@nestjs/common';
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
import { LoggerMiddleware } from './infra/middleware/loggger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './infra/filters/http.exeption.filter';


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
  providers:[
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
