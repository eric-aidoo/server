import { MissingFieldError, ValidationError } from '../../../../utils/error-responses';

export const validateWaitlistUser = (email, countryOfResidence) => {
  if (!email || email.trim() === '') {
    throw new MissingFieldError('Email is required');
  }
  const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailIsValid = emailValidator.test(email);
  if (!emailIsValid) {
    throw new ValidationError('Email is invalid');
  }
  if (!countryOfResidence || countryOfResidence.trim() === '') {
    throw new MissingFieldError('Country is required');
  }
  const isoAlpha2CodeValidator = /^[A-Z]{2}$/;
  const isValidIsoAlpha2Code = isoAlpha2CodeValidator.test(countryOfResidence);
  if (!isValidIsoAlpha2Code) {
    throw new ValidationError('Country must be an ISO alpha-2 code and uppercased');
  }
};
