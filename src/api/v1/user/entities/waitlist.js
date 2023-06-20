import { generateToken } from '../../../../utils/helpers';
import { validateWaitlistUser } from '../validations/validate-waitlist-user';

export default class Waitlist {
  static addUser({ email, country_of_residence }) {
    validateWaitlistUser(email, country_of_residence);
    return Object.freeze({
      invite_code: generateToken({ lengthOfToken: 9 }),
      email: email.trim().toLowerCase(),
      is_approved_to_test: false,
      country_of_residence: country_of_residence,
      created_at: new Date().toISOString(),
    });
  }
}
