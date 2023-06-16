import {
  capitalize,
  determineIdentityDocumentIssuer,
  determineIdentityDocumentType,
  generateHash,
  generateToken,
  sanitize,
  standardizeDate,
  uploadFileToS3Bucket,
} from '../../../../utils/helpers';
import { validateAgeRequirement } from '../validations/age-requirement-validation';
import { validateAuthorizationPin } from '../validations/authorization-pin-validation';
import { validateAvatar } from '../validations/user-avatar-validation';
import { validateKycInfo } from '../validations/kyc-document';
import { validatePhoneNumber } from '../validations/phone-number-validation';
import { validateSignupDetails } from '../validations/signup-validation';

export default class UserEntity {
  // Create a new user entity
  static create(user) {
    const {
      email,
      password,
      username,
      first_name,
      middle_name = null,
      last_name,
      country_of_residence,
    } = user;
    validateSignupDetails(email, password, username, first_name, last_name, country_of_residence);
    const sanitizedPassword = sanitize(password);

    return Object.freeze({
      id: `user_${generateToken({ lengthOfToken: 22 })}`,
      type: 'individual',
      role: 'basic',
      status: 'active',
      is_email_verified: false,
      is_phone_verified: false,
      first_name: capitalize(first_name.trim()),
      middle_name: capitalize(middle_name) ?? null,
      last_name: capitalize(last_name.trim()),
      email: email.trim().toLowerCase(),
      password: generateHash(sanitizedPassword),
      username: `@${username}`,
      country_of_residence,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tos_acceptance: JSON.stringify({
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
  }

  // Add user's phone number
  static addPhoneNumber({ username, country_of_residence, phone_number }) {
    validatePhoneNumber(username, country_of_residence, phone_number);
    return Object.freeze({
      username: username.charAt(0) !== '@' ? `@${username}` : username,
      phone_number,
    });
  }

  // Add user's date of birth
  static addDateOfBirth({ username, date_of_birth }) {
    validateAgeRequirement(username, date_of_birth);
    return Object.freeze({
      username: username.charAt(0) !== '@' ? `@${username}` : username,
      date_of_birth: standardizeDate(date_of_birth),
    });
  }

  // Create an authorization pin for the user
  static createAuthorizationPin({ username, authorization_pin }) {
    validateAuthorizationPin(username, authorization_pin);
    return Object.freeze({
      username: username.charAt(0) !== '@' ? `@${username}` : username,
      authorization_pin: generateHash(authorization_pin),
    });
  }

  // Verify user's identity
  static async verifyIdentity({
    username,
    country_of_residence,
    identification_number,
    front_image_of_document = null,
    back_image_of_document = null,
    selfie = null,
  }) {
    validateKycInfo(
      username,
      country_of_residence,
      identification_number,
      front_image_of_document,
      back_image_of_document,
      selfie,
    );
    // Upload image file to s3 bucket and return a url to retrieve them
    const frontImageUrl = await uploadFileToS3Bucket(front_image_of_document);
    const backImageUrl = await uploadFileToS3Bucket(back_image_of_document);
    const selfieImageUrl = await uploadFileToS3Bucket(selfie);

    const typeOfDocument = determineIdentityDocumentType(country_of_residence);
    const documentIssuer = determineIdentityDocumentIssuer(country_of_residence, typeOfDocument);

    return Object.freeze({
      username: username.charAt(0) !== '@' ? `@${username}` : username,
      identification_number,
      identification_document: typeOfDocument,
      identification_document_issuer: documentIssuer,
      front_image_of_document: frontImageUrl ?? null,
      back_image_of_document: backImageUrl ?? null,
      selfie: selfieImageUrl ?? null,
    });
  }

  // Create profile avatar
  static async createAvatar({ username, avatar }) {
    validateAvatar(username, avatar);
    const avatarImageUrl = await uploadFileToS3Bucket(avatar);
    return Object.freeze({
      username: username.charAt(0) !== '@' ? `@${username}` : username,
      avatar: avatarImageUrl,
    });
  }
}
