import { loadEmailTemplates } from '../../helpers/utilities';
import sendEmail from './client';

const sendEmailVerificationCode = async ({ recipient, firstName, verificationCode }) => {
  try {
    const emailTemplatesFolder = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates(emailTemplatesFolder);
    await sendEmail({
      recipient,
      template: emailTemplates.emailVerificationCode,
      subject: `Confirm it's you`,
      dynamicValues: { firstName, verificationCode },
    });
  } catch (error) {
    throw error;
  }
};

const sendLoginActivityReportEmail = async ({
  recipient,
  firstName,
  timestamp,
  device,
  location,
  loginUrl,
}) => {
  try {
    const emailTemplatesFolder = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates(emailTemplatesFolder);
    await sendEmail({
      recipient,
      template: emailTemplates.loginActivityReport,
      subject: '[Alert] There was a new login to your Credet account',
      dynamicValues: { firstName, timestamp, device, location, loginUrl },
    });
  } catch (error) {
    throw error;
  }
};

const EmailService = {
  sendEmailVerificationCode,
  sendLoginActivityReportEmail,
};

export default EmailService;
