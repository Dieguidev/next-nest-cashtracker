import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { envs } from 'src/config/envs';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: envs.mailerService,
      auth: {
        user: envs.mailerEmail,
        pass: envs.mailerSecretKey,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, html, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html,
        attachments,
      });

      return true;
    } catch (error) {
      console.log('Error sending email:', error);
      return false;
    }
  }
}
