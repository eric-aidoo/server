import { MissingFieldError } from '../../../../utils/error-responses';

export const validateAvatar = (username, avatar) => {
  if (!username) {
    throw new MissingFieldError('Username is required');
  }
  if (!avatar) {
    throw new MissingFieldError('Avatar image is required');
  }
};
