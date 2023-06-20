import config from '../../config';
import libraries from '../../utils/libraries';

/**
 * Initialize SMS client
 */
const smsClient = libraries.twilio(config.sms.twilio.accountSid, config.sms.twilio.authToken);

const sendTextMessage = ({ destination, message }) => {
  try {
    smsClient.messages.create({
      body: message,
      from: config.sms.twilio.sender,
      to: destination,
    });
  } catch (error) {
    throw error;
  }
};

const SmsService = {
  sendTextMessage,
};

export default SmsService;
