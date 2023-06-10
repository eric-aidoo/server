import { MissingFieldError, ValidationError } from '../../../../utils/error-responses';

export const validateAuthorizationPin = (username, authorizationPin) => {
  if (!username || username.trim() === '') {
    throw new MissingFieldError('Username is required');
  }
  if (!authorizationPin || authorizationPin.trim() === '') {
    throw new MissingFieldError(
      `Authorization PIN is required. We'll ask you to confirm this PIN whenever you make a payment.`,
    );
  }
  const authorizationPinValidator = /^\d{4}$/;
  const isValidAuthorizatinPin = authorizationPinValidator.test(authorizationPin);
  if (!isValidAuthorizatinPin) {
    throw new ValidationError('Authorization PIN must be a 4-digit pin');
  }
};
