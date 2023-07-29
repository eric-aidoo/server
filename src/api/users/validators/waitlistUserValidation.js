import { MissingFieldError, ValidationError } from '../../../helpers/errors';
import { capitalize } from '../../../helpers/utilities';

const validateWaitlistUser = (email, firstName, lastName) => {
  if (!email || email.trim() === '') {
    throw new MissingFieldError('Email is required');
  }
  const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailIsValid = emailValidator.test(email);
  if (!emailIsValid) {
    throw new ValidationError('Invalid email');
  }
  if (!firstName || firstName.trim() === '') {
    throw new MissingFieldError('First name is required');
  }
  if (firstName.length < 2) {
    throw new ValidationError('First name must be at least 2 characters long');
  }
  if (!lastName || lastName.trim() === '') {
    throw new MissingFieldError('Last name is required');
  }
  if (lastName.length < 2) {
    throw new ValidationError('Last name must be at least 2 characters long');
  }

  return {
    email: email.trim().toLowerCase(),
    firstName: capitalize(firstName.trim()),
    lastName: capitalize(lastName.trim()),
  };
};

export default validateWaitlistUser;
