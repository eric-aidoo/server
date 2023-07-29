import { generateToken } from '../../../helpers/utilities';
import validateWaitlistUser from '../validators/waitlistUserValidation';

const createUser = ({ email, first_name, last_name }) => {
  const validUser = validateWaitlistUser(email, first_name, last_name);
  return Object.freeze({
    id: generateToken({ lengthOfToken: 32 }),
    email: validUser.email,
    first_name: validUser.firstName,
    last_name: validUser.lastName,
    is_allowed_to_test: false,
    invite_code: null,
  });
};

const WaitlistFactory = {
  createUser,
};

export default WaitlistFactory;
