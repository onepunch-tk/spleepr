import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAUTH2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly configService: ConfigService) {}
  async notifyEmail({ email, text }: NotifyEmailDto) {
    try {
      await this.transporter.sendMail({
        from: 'Sleepr Admin🥰 <sleepr.official@gmail.com>',
        to: email,
        subject: 'Sleepr Notification',
        text,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
