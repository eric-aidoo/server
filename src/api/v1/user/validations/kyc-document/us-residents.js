import { MissingFieldError, ValidationError } from '../../../../../utils/error-responses';

export const validateKycInfoForUSResidents = (username, countryOfResidence, ssn) => {
  if (!username) {
    throw new MissingFieldError('Username is required');
  }
  if (!countryOfResidence) {
    throw new MissingFieldError('Country is required');
  }
  if (!ssn) {
    throw new MissingFieldError('SSN number is required');
  }
  const ssnIsAString = typeof ssn !== 'string';
  if (!ssnIsAString) {
    throw new ValidationError('SSN must be a string');
  }
  const ssnValidator = /^\d{9}$/;
  const ssnIsValid = ssnValidator.test(ssn);

  if (!ssnIsValid) {
    throw new ValidationError('Invalid SSN');
  }
};
