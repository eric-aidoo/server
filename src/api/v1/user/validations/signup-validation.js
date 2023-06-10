import { MissingFieldError, ValidationError } from '../../../../utils/error-responses';
import { serviceableCountries } from '../../../../utils/helpers';

export const validateSignupDetails = (email, password, username, firstName, lastName, countryOfResidence) => {
  if (!email || email.trim() === '') {
    throw new MissingFieldError('Email is required');
  }
  const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailValidator.test(email);
  if (!isValidEmail) {
    throw new ValidationError('Email is invalid');
  }
  if (!password || password.trim() === '') {
    throw new MissingFieldError('Password is required');
  }
  const passwordValidator = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const isValidPassword = passwordValidator.test(password);
  if (!isValidPassword) {
    throw new ValidationError(
      'Password must be at least 8 characters long, and include at least one number, one uppercase letter, one lowercase letter and a special character',
    );
  }
  if (!username || username.trim() === '') {
    throw new MissingFieldError('Username is required');
  }
  const usernameValidator = /^[a-zA-Z0-9_]{2,15}$/;
  const isValidUsername = usernameValidator.test(username);
  if (!isValidUsername) {
    throw new ValidationError(
      'Username must be between 2 and 15 characters and contain only letters, numbers, and underscores and no spaces',
    );
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
    throw new ValidationError('Last name is must be at least 2 characters long');
  }
  if (!countryOfResidence || countryOfResidence.trim() == '') {
    throw new MissingFieldError('Country is required');
  }
  const isoAlpha2CodeValidator = /^[A-Z]{2}$/;
  const isValidIsoAlpha2Code = isoAlpha2CodeValidator.test(countryOfResidence);
  if (!isValidIsoAlpha2Code) {
    throw new ValidationError('Country must be an ISO alpha-2 code and uppercased');
  }
  const selectedCountryIsServiceable = serviceableCountries.test(countryOfResidence);
  if (!selectedCountryIsServiceable) {
    throw new ValidationError(
      `Credet is currently not available in your country or region. Tell us where to expand next.`,
    );
  }
};
