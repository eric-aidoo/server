import { MissingFieldError, ValidationError } from '../../../../utils/error-responses';
import { phoneNumberValidator } from '../../../../utils/helpers';

export const validatePhoneNumber = (username, countryOfResidence, phoneNumber) => {
  if (!username || username.trim() === '') {
    throw new MissingFieldError('Username is required');
  }
  if (!countryOfResidence || countryOfResidence.trim() === '') {
    throw new MissingFieldError('Country is required');
  }
  if (!phoneNumber || phoneNumber.trim() === '') {
    throw new MissingFieldError('Phone number is required');
  }
  const isValidPhoneNumber = phoneNumberValidator(countryOfResidence).test(phoneNumber);
  if (!isValidPhoneNumber) {
    throw new ValidationError('Invalid phone number');
  }
};
