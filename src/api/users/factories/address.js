import { capitalize, generateToken } from '../../../helpers/utilities';
import validateAddress from '../validators/addressValidation';

const createAddress = (address) => {
  const { line1, line2, city, state, zip_code, country } = address;
  const validAddress = validateAddress(line1, line2, city, state, zip_code, country);
  return Object.freeze({
    id: generateToken({ lengthOfToken: 32 }),
    line1: capitalize(validAddress.line1.trim()),
    line2: capitalize(validAddress.line2.trim()),
    city: capitalize(validAddress.city.trim()),
    state: capitalize(validAddress.state.trim().toUpperCase()),
    zip_code: capitalize(validAddress.zipCode.trim()),
    country: validAddress.country.toUpperCase(),
  });
};

const AddressFactory = {
  createAddress,
};

export default AddressFactory;
