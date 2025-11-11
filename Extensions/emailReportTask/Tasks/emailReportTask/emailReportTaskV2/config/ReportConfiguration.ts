import { MailConfiguration } from "./mail/MailConfiguration";
import { ReportDataConfiguration } from "./report/ReportDataConfiguration";
import { IConfigurationProvider } from "./IConfigurationProvider";
import { PipelineConfiguration } from "./pipeline/PipelineConfiguration";
import { SendMailCondition } from "./report/SendMailCondition";
import { InputError } from "../exceptions/InputError";
import { TaskConstants } from "./TaskConstants";
import { StringUtils } from "../utils/StringUtils";

export class ReportConfiguration {
  private sendMailCondition: SendMailCondition;
  private mailConfiguration: MailConfiguration;
  private reportDataConfiguration: ReportDataConfiguration;
  private pipelineConfiguration: PipelineConfiguration;

  constructor(configProvider: IConfigurationProvider) {
    this.sendMailCondition = configProvider.getSendMailCondition();
    this.mailConfiguration = configProvider.getMailConfiguration();
    this.reportDataConfiguration = configProvider.getReportDataConfiguration();
    this.pipelineConfiguration = configProvider.getPipelineConfiguration();
  }

  validateConfiguration() {
    if (this.reportDataConfiguration.$testResultsConfig.$maxItemsToShow <= 0) {
      this.throwError(TaskConstants.MAXTESTFAILURESTOSHOW_INPUTKEY, this.reportDataConfiguration.$testResultsConfig.$maxItemsToShow, "be > 0");
    }

    this.validateMailConfig();
  }

  private validateMailConfig() {
    if (StringUtils.isNullOrWhiteSpace(this.mailConfiguration.$mailSubject)) {
      this.throwError(TaskConstants.SUBJECT_INPUTKEY, this.mailConfiguration.$mailSubject, "be specified");
    }

    if (StringUtils.isNullOrWhiteSpace(this.mailConfiguration.$smtpConfig.$smtpHost)) {
      this.throwError('SMTP credentials', this.mailConfiguration.$smtpConfig.$smtpHost, "specify SMTP Host");
    }

    if (StringUtils.isNullOrWhiteSpace(this.mailConfiguration.$smtpConfig.$smtpPort)) {
      this.throwError('SMTP credentials', this.mailConfiguration.$smtpConfig.$smtpPort, "specify SMTP Port");
    }

    if (StringUtils.isNullOrWhiteSpace(this.mailConfiguration.$smtpConfig.$smtpUser)) {
      this.throwError('SMTP credentials', this.mailConfiguration.$smtpConfig.$smtpUser, "specify SMTP User");
    }

    if (StringUtils.isNullOrWhiteSpace(this.mailConfiguration.$smtpConfig.$smtpPass)) {
      this.throwError('SMTP credentials', this.mailConfiguration.$smtpConfig.$smtpPass, "specify SMTP Pass");
    }

    if (StringUtils.isNullOrWhiteSpace(this.mailConfiguration.$fromUser)) {
      this.throwError('SMTP credentials', this.mailConfiguration.$fromUser, "specify SMTP from User");
    }
  }

  // Getters
  public get $sendMailCondition(): SendMailCondition {
    return this.sendMailCondition;
  }

  public get $mailConfiguration(): MailConfiguration {
    return this.mailConfiguration;
  }

  public get $reportDataConfiguration(): ReportDataConfiguration {
    return this.reportDataConfiguration;
  }

  public get $pipelineConfiguration(): PipelineConfiguration {
    return this.pipelineConfiguration;
  }

  private throwError(prefix: string, suffix: any, expectation: string) {
    throw new InputError(`${prefix} should ${expectation}. Actual Input value: '${suffix}'`);
  }
}
