import WaitlistRepository from '../../../../database/mysql/repositories/waitlist-repository';
import EmailService from '../../../../integrations/email/email-service';
import Waitlist from '../entities/waitlist';

const joinWaitlist = async (user) => {
  try {
    const newUser = Waitlist.addUser(user);
    await WaitlistRepository.createUser(newUser);
    await EmailService.sendWaitlistConfirmationEmail({ recipient: newUser.email });
    const successMessage = `You're on the waitlist!`;
    return { successMessage };
  } catch (error) {
    throw error;
  }
};

export const EarlyAccessService = {
  joinWaitlist,
};
