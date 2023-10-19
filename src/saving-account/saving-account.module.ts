import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingsAccountEntity } from 'src/infra/data/entities/saving-accounts.entity';
import { SavingsAccountService } from './service/saving-account.impl.service';
import { UserModule } from 'src/user/user.module';
import { DataBaseModule } from 'src/infra/data/database.module';
import { SavingAccountRepository } from './repository/saving-account.repository';
import { SavingAccountController } from './presentation/saving-accoutn.controller';
import { AuthModule } from 'src/infra/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [AuthModule,MailModule,DataBaseModule,TypeOrmModule.forFeature([SavingsAccountEntity])],
  providers: [SavingAccountRepository,SavingsAccountService ],
  controllers : [SavingAccountController],
  exports: [SavingsAccountService],
})
export class SavingAccountModule {}