import config from '../../config';
import libraries from '../../utils/libraries';

/**
 * Initialize SMS client
 */
const smsClient = libraries.twilio(
  config.smsAuthentication.twilio.accountSid,
  config.smsAuthentication.twilio.authToken,
);

const sendVerificationCodeTextMessage = async ({ phoneNumber, verificationCode }) => {
  try {
    await smsClient.messages.create({
      body: `Your Credet verification code is: ${verificationCode}. Don't share it with anyone.`,
      from: config.smsAuthentication.twilio.sender,
      to: phoneNumber,
    });
  } catch (error) {
    throw error;
  }
};

const SmsService = {
  sendVerificationCodeTextMessage,
};

export default SmsService;
