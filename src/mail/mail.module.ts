import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { mailerConfig } from './mail.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueService } from './queue.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => mailerConfig(configService),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService,QueueService],
  exports : [MailService,QueueService]
})
export class MailModule {}
