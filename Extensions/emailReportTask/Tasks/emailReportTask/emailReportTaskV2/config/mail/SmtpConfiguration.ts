export class SmtpConfiguration {
  private smtpHost: string;
  private smtpPort: string;
  private smtpUser: string;
  private smtpPass: string;
  private enableTLS: boolean;

  constructor($smtpHost: string, $smtpPort: string, $smtpUser: string, $smtpPass: string, $enableTLS: boolean) {
    this.smtpHost = $smtpHost;
    this.smtpPort = $smtpPort;
    this.smtpUser = $smtpUser;
    this.smtpPass = $smtpPass;
    this.enableTLS = $enableTLS;
  }

  public get $smtpHost() {
    return this.smtpHost;
  }

  public get $smtpPort() {
    return this.smtpPort;
  }

  public get $smtpUser() {
    return this.smtpUser;
  }

  public get $smtpPass() {
    return this.smtpPass;
  }

  public get $enableTLS() {
    return this.enableTLS;
  }
}
