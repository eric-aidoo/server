import config from '../../config/appConfig';
import libraries from '../../helpers/libraries';
import { replaceHtmlPlaceholdersWithDynamicValues } from '../../helpers/utilities';

const sendEmail = async ({ recipient, template, subject, dynamicValues }) => {
  try {
    const emailTransporter = libraries.nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailAuthentication.user,
        pass: config.emailAuthentication.password,
      },
    });
    const emailTemplate = replaceHtmlPlaceholdersWithDynamicValues({
      html: template,
      context: dynamicValues,
    });
    const mail = {
      from: config.emailAuthentication.user,
      to: recipient,
      subject: subject,
      html: emailTemplate,
    };
    return await emailTransporter.sendMail(mail);
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
