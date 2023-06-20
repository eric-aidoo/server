import { loadEmailTemplates, sendEmail } from '../../utils/helpers';

const sendEmailVerificationEmail = async ({ recipient, firstName, verificationCode }) => {
  try {
    const folderPath = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates({ templatesFolder: folderPath });
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

const sendWelcomeEmail = async ({ recipient, firstName, passwordResetCode }) => {
  try {
    const folderPath = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates({ templatesFolder: folderPath });
    await sendEmail({
      recipient,
      template: emailTemplates.welcome,
      subject: `Your Credet account is activated`,
      dynamicValues: { firstName },
    });
  } catch (error) {
    throw error;
  }
};

const sendWaitlistConfirmationEmail = async ({ recipient }) => {
  try {
    const folderPath = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates({ templatesFolder: folderPath });
    await sendEmail({
      recipient,
      template: emailTemplates.waitlistConfirmation,
      subject: `You're on the waitlist!`,
      dynamicValues: {},
    });
  } catch (error) {
    throw error;
  }
};

const sendPasswordResetInstructionsEmail = async ({ recipient, firstName, passwordResetLink }) => {
  try {
    const folderPath = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates({ templatesFolder: folderPath });
    await sendEmail({
      recipient,
      template: emailTemplates.resetPassword,
      subject: 'Reset your Credet password',
      dynamicValues: { firstName, passwordResetLink },
    });
  } catch (error) {
    throw error;
  }
};

const EmailService = {
  sendWelcomeEmail,
  sendEmailVerificationEmail,
  sendWaitlistConfirmationEmail,
  sendPasswordResetInstructionsEmail,
};

export default EmailService;
