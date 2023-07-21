import { capitalize, generateHash, generateToken, sanitize } from '../../../helpers/utilities';
import validateUserSignup from '../validators/signupValidation';

const createUser = ({
  email,
  password,
  first_name,
  middle_name = null,
  last_name,
  country_of_residence,
  username,
}) => {
  const validUser = validateUserSignup(
    email,
    password,
    username,
    first_name,
    last_name,
    country_of_residence,
  );
  const sanitizedPassword = sanitize(validUser.password);
  const hashedPassword = generateHash(sanitizedPassword);

  return Object.freeze({
    id: generateToken({ lengthOfToken: 22 }),
    type: 'individual',
    role: 'basic',
    status: 'active',
    first_name: capitalize(validUser.firstName.trim()),
    middle_name: capitalize(middle_name) ?? null,
    last_name: capitalize(validUser.lastName.trim()),
    email: validUser.email.trim().toLowerCase(),
    password: hashedPassword,
    username: `@${validUser.username}`,
    country_of_residence: validUser.countryOfResidence.trim(),
    is_email_verified: false,
    is_phone_verified: false,
    is_id_verified: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    consents: JSON.stringify({
      privacy_policy: {
        accepted: true,
        accepted_at: new Date().toISOString(),
      },
      terms_of_service: {
        accepted: true,
        accepted_at: new Date().toISOString(),
      },
    }),
  });
};

const UserFactory = {
  createUser,
};

export default UserFactory;
