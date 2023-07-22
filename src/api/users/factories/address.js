import { capitalize, generateToken } from '../../../helpers/utilities';
import validateAddress from '../validators/addressValidation';

const createAddress = (address) => {
  const { line1, line2, city, state, zip_code, country } = address;
  const validAddress = validateAddress(line1, line2, city, state, zip_code, country);
  return Object.freeze({
    id: generateToken({ lengthOfToken: 32 }),
    line1: validAddress.line1,
    line2: validAddress.line2,
    city: validAddress.city,
    state: validAddress.state,
    zip_code: validAddress.zipCode,
    country: validAddress.country,
  });
};

const AddressFactory = {
  createAddress,
};

export default AddressFactory;
