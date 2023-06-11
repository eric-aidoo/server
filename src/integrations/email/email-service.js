import { loadEmailTemplates, sendEmail } from '../../utils/helpers';

const sendEmailVerificationEmail = async ({ emailAddress, firstName, verificationCode }) => {
  try {
    const folderPath = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates({ templatesFolder: folderPath });
    await sendEmail({
      emailAddress,
      template: emailTemplates.verifyEmail,
      subject: `Confirm it's you`,
      dynamicValues: { firstName, verificationCode },
    });
  } catch (error) {
    throw error;
  }
};

const sendWelcomeEmail = async ({ emailAddress, firstName, passwordResetCode }) => {
  try {
    const folderPath = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates({ templatesFolder: folderPath });
    await sendEmail({
      emailAddress,
      template: emailTemplates.welcome,
      subject: `Your Credet account is activated`,
      dynamicValues: { firstName },
    });
  } catch (error) {
    throw error;
  }
};

const sendPasswordResetInstructionsEmail = async ({ emailAddress, firstName, passwordResetLink }) => {
  try {
    const folderPath = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates({ templatesFolder: folderPath });
    await sendEmail({
      emailAddress,
      template: emailTemplates.resetPassword,
      subject: 'Reset your Credet password',
      dynamicValues: { firstName, passwordResetLink },
    });
  } catch (error) {
    throw error;
  }
};

const EmailService = {
  sendEmailVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetInstructionsEmail,
};

export default EmailService;
