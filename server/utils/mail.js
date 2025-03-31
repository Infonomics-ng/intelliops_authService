import nodemailer from 'nodemailer';
import * as htmlToText from 'html-to-text';
import pug from 'pug';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export class Email {
  constructor(email, url, token, attachment) {
    this.to = email;
    this.url = url;
    this.token = token;
    this.attachment = attachment;
    this.from = `POS <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      url: this.url,
      email: this.to,
      token: this.token,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert.toString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', "Welcome to MTN's POS");
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your password reset token');
  }

  async sendWithAttachment(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      url: this.url,
      email: this.to,
      token: this.token,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert.toString(html),
      attachments: [
        {
          filename: this.attachment.name,
          content: this.attachment.data,
        },
      ],
    };

    await this.newTransport().sendMail(mailOptions);
  }
  async sendCashUpReceipt() {
    await this.sendWithAttachment('cashup', 'Cashup Receipt');
  }
  async sendTransR() {
    await this.sendWithAttachment('trans', 'Transaction Receipt');
  }
}
