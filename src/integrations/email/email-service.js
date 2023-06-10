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
  const sendWelcomeEmail = async ({ emailAddress, firstName }) => {
    const folderPath = 'integrations/email/templates';
    const emailTemplates = await loadEmailTemplates({ templatesFolder: folderPath });
    await sendEmail({
      emailAddress,
      template: emailTemplates.welcome,
      subject: `Your Credet account is activated`,
      dynamicValues: { firstName },
    });
  };

  return {
    sendEmailVerificationEmail,
    sendWelcomeEmail,
  };
}
