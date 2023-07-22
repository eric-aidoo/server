import { MissingFieldError, ValidationError } from '../../../helpers/errors';
import { capitalize, validateUSStateAbbreviation } from '../../../helpers/utilities';

const validateAddress = (line1, line2, city, state, zipCode, country) => {
  if (!line1 || line1.trim() === '') {
    throw new MissingFieldError('Street name is required');
  }
  if (line1.length > 200) {
    throw new ValidationError('Street name is too long');
  }
  if (line2.length > 200) {
    throw new ValidationError('Address line2 (Apt/Bldg/Suite) is too long');
  }
  if (!city || city.trim() === '') {
    throw new MissingFieldError('City is required');
  }
  if (city.length > 200) {
    throw new ValidationError('City name is too long');
  }
  if (!state || state.trim() === '') {
    throw new MissingFieldError('State is required');
  }
  if (!zipCode || zipCode.trim() === '') {
    throw new MissingFieldError('Zip code is required');
  }
  if (!country || country.trim() === '') {
    throw new MissingFieldError('Country is required');
  }
  if (country === 'US') {
    const stateAbbreviationIsValid = validateUSStateAbbreviation(state);
    if (!stateAbbreviationIsValid) {
      throw new ValidationError('State must be 2 characters long for US addresses');
    }
  }

  return {
    line1: capitalize(line1.trim()),
    line2: capitalize(line2.trim()),
    city: capitalize(city.trim()),
    state: state.trim().toUpperCase(),
    zipCode: capitalize(zipCode.trim()),
    country: country.trim().toUpperCase(),
  };
};

export default validateAddress;
