import { MissingFieldError, ValidationError } from '../../../../utils/error-responses';

export const validateAgeRequirement = (username, dateOfBirth) => {
  if (!username || username.trim() === '') {
    throw new MissingFieldError('Username is required');
  }
  if (!dateOfBirth || dateOfBirth.trim() === '') {
    throw new MissingFieldError('Date of birth is required');
  }
  const NUMBER_OF_MILLISECONDS_IN_A_YEAR = 31557600000;
  const birthday = new Date(dateOfBirth);
  const age = ~~((Date.now() - birthday) / NUMBER_OF_MILLISECONDS_IN_A_YEAR);
  const personMeetsLegalAgeRequirement = age > 18;
  if (!personMeetsLegalAgeRequirement) {
    throw new ValidationError('You must be at least 18 years or older to use Credet');
  }
};
