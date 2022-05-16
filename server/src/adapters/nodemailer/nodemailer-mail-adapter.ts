import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '4e62191c5bdef9',
    pass: '8e8150353c10eb',
    // pass: '8e8150353c10eb',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feddget <oi@feedget.com>',
      to: 'Jhonnatan Bezerra <jonis@feedget.com>',
      subject,
      html: body,
    });
  }
}
