import { Module } from "@nestjs/common";
import { ServiceController } from "./service.controller";
import { UserModule } from "src/user/user.module";
import { SavingAccountModule } from "src/saving-account/saving-account.module";
import { CheckingAccountModule } from "src/checking-account/checking-account.module";
import { MailModule } from "src/mail/mail.module";


@Module({
  imports: [UserModule,MailModule, SavingAccountModule,CheckingAccountModule],
  controllers: [ServiceController],
})
export class ServiceModule {}