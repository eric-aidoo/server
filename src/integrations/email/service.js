import { loadEmailTemplates } from '../../helpers/utilities';
import sendEmail from './client';

const requestAnEmailVerification = async ({ recipient, firstName, verificationCode }) => {
  try {
    const emailTemplatesFolder = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates(emailTemplatesFolder);
    await sendEmail({
      recipient,
      template: emailTemplates.verifyEmail,
      subject: `Confirm it's you`,
      dynamicValues: { firstName, verificationCode },
    });
  } catch (error) {
    throw error;
  }
};

const EmailService = {
  requestAnEmailVerification,
};

export default EmailService;
