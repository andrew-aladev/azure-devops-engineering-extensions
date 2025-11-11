import { RecipientsConfiguration } from "./RecipientsConfiguration";
import { SmtpConfiguration } from "./SmtpConfiguration";

export class MailConfiguration {
  private mailSubject: string;
  private toRecipientsConfig: RecipientsConfiguration;
  private ccRecipientsConfig: RecipientsConfiguration;
  private smtpConfig: SmtpConfiguration;
  private fromUser: string;
  private defaultDomain: string;

  constructor(
    $mailSubject: string,
    $toRecipientsConfig: RecipientsConfiguration,
    $ccRecipientsConfig: RecipientsConfiguration,
    $smtpConfig: SmtpConfiguration,
    $fromUser: string,
    $defaultDomain: string
  ) {
    this.mailSubject = $mailSubject;
    this.toRecipientsConfig = $toRecipientsConfig;
    this.ccRecipientsConfig = $ccRecipientsConfig;
    this.smtpConfig = $smtpConfig;
    this.fromUser = $fromUser;
    this.defaultDomain = $defaultDomain;
  }

  public get $defaultDomain() {
    return this.defaultDomain;
  }

  public get $mailSubject() {
    return this.mailSubject;
  }

  public get $ccRecipientsConfig() {
    return this.ccRecipientsConfig;
  }

  public get $smtpConfig() {
    return this.smtpConfig;
  }

  public get $fromUser() {
    return this.fromUser;
  }

  public get $toRecipientsConfig() {
    return this.toRecipientsConfig;
  }

  public set $mailSubject(value: string) {
    this.mailSubject = value;
  }
}
