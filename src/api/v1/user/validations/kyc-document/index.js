import { MissingFieldError, ValidationError } from '../../../../../utils/error-responses';
import { serviceableCountries } from '../../../../../utils/helpers';
import { validateKycInfoForUSResidents } from './us-residents';

export const validateKycInfo = (
  username,
  countryOfResidence,
  ssnOrEquivalent,
  identificationDocumentFrontImage = null,
  identificationDocumentBackImage = null,
  selfie = null,
) => {
  if (!username) {
    throw new MissingFieldError('Username is required');
  }
  const isoAlpha2CodeValidator = /^[A-Z]{2}$/;
  const isValidIsoAlpha2Code = isoAlpha2CodeValidator.test(countryOfResidence);
  if (!isValidIsoAlpha2Code) {
    throw new ValidationError('Country must be an ISO alpha-2 code and uppercased');
  }
  const selectedCountryIsServiceable = serviceableCountries.test(countryOfResidence);
  if (!selectedCountryIsServiceable) {
    throw new ValidationError('Sorry, Credet is currently unavailable in the specified country');
  }
  if (countryOfResidence === 'US') {
    return validateKycInfoForUSResidents(username, countryOfResidence, ssnOrEquivalent);
  }
};
