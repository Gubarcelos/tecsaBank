import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service'; 

@Injectable()
export class QueueService {
  private queue: any[] = [];
  private isProcessing = false;

  constructor(private mailService: MailService) {} 

  async enqueue(data: any) {
    this.queue.push(data);

    if (!this.isProcessing) {
      this.isProcessing = true;
      await this.processQueue();
    }
  }

  private async processQueue() {
    while (this.queue.length > 0) {
      const data = this.queue.shift();
      const {template, ...mailData} = data;
      try {
        await this.mailService.sendEmail(mailData, template);
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
      }
    }

    this.isProcessing = false;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}