import config from '../../config';
import {
  loadEmailTemplates,
  replaceHtmlPlaceholdersWithDynamicValues,
  replacePlaceholdersWithDynamicValues,
  sendEmail,
} from '../../utils/helpers';
import libraries from '../../utils/libraries';

export default function EmailService() {
  // Send email verification email (for password reset and account activation)
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

  // Send welcome email
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

  // Send password reset code email
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

  return {
    sendEmailVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetInstructionsEmail,
  };
}
