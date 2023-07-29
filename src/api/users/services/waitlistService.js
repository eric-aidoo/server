import waitlistRepository from '../dataAccess/waitlistRepository';
import WaitlistFactory from '../factories/waitlistUser';

const signup = async (user) => {
  try {
    const newUser = WaitlistFactory.createUser(user);
    await waitlistRepository.addUser(newUser);
    return {
      response: `You've been added to the waitlist`,
    };
  } catch (error) {
    throw error;
  }
};

const WaitlistService = {
  signup,
};

export default WaitlistService;
