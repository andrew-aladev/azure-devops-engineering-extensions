import { IReportSender } from "./IReportSender";
import { MailConfiguration } from "./config/mail/MailConfiguration";
import { MailAddressViewModel } from "./model/viewmodel/MailAddressViewModel";
import { Report } from "./model/Report";
import { MailError } from "./exceptions/MailError";
import { isNullOrUndefined } from "util";
const nodemailer = require("nodemailer");

export class EmailSender implements IReportSender {
  public async sendReportAsync(report: Report, htmlReportMessage: string, mailConfiguration: MailConfiguration): Promise<boolean> {
    const mailAddressViewModel = new MailAddressViewModel(report, mailConfiguration);

    const {
      $smtpHost: smtpHost,
      $smtpPort: smtpPort,
      $smtpUser: smtpUser,
      $smtpPass: smtpPass,
      $enableTLS: enableTLS
    } = mailConfiguration.$smtpConfig;

    const options = {
      host: smtpHost,
      port: smtpPort,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    };

    let transporter;

    if(enableTLS) {
      transporter = nodemailer.createTransport({
        ...options,
        tls: {
          maxVersion: 'TLSv1.2',
          minVersion: 'TLSv1.2',
          rejectUnauthorized: false
        },
        requireTLS: true
      });
    } else {
      transporter = nodemailer.createTransport(options);
    }

    try {
      const result = await this.sendMailAsync(transporter, mailAddressViewModel, mailConfiguration, htmlReportMessage);
      console.log(`Mail Sent Successfully: ${result.response}`);
      return true;
    } catch(err) {
      throw new MailError(err);
    }
  }

  private async sendMailAsync(
    transporter: any,
    mailAddressViewModel: MailAddressViewModel,
    mailConfiguration: MailConfiguration, 
    message: string
  ): Promise<any> {
    const {
      $fromUser: fromUser,
      $mailSubject: mailSubject
    } = mailConfiguration;
    const { to, cc } = mailAddressViewModel;

    return new Promise(async (resolve, reject) => {
      await transporter.sendMail(
        {
          from: fromUser,
          to: to.join(","),
          cc: isNullOrUndefined(cc) || cc.length < 1 ? null : cc.join(","),
          subject: mailSubject,
          html: message
        },
        (err: any, response: any) => {
          if (err){
            reject(err);
          } else {
            resolve(response);
          }
        }
      );
    });
  }
}
