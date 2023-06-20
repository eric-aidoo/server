import {
  AlreadyExistsError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../../../utils/error-responses';
import { loadSqlQueries } from '../../../utils/helpers';
import client from '../connection';

/**
 * Find user method
 */
const findUser = async (usernameOrEmail) => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
  try {
    const requestInput = [usernameOrEmail, usernameOrEmail];
    const [queryResponse] = await database.query(queries.findUser, requestInput);
    const userDoesNotExist = !queryResponse.length || queryResponse.length === 0;
    const user = queryResponse[0];
    return userDoesNotExist ? null : Object.freeze(user);
  } catch (error) {
    throw error;
  }
};

/**
 * This method checks if user exists and returns a boolean
 */
const checkIfUserExists = async (usernameOrEmail) => {
  try {
    const user = await findUser(usernameOrEmail);
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

/**
 * Create or save user entry method
 */
const createUser = async (user) => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
  try {
    const [usernameAlreadyExists, emailAlreadyExists] = await Promise.all([
      checkIfUserExists(user.username),
      checkIfUserExists(user.email),
    ]);
    if (usernameAlreadyExists) {
      throw new AlreadyExistsError('Username already taken');
    }
    if (emailAlreadyExists) {
      throw new AlreadyExistsError('Email is already registered with an account');
    }
    const requestInput = Object.values(user);
    const [request] = await database.query(queries.createUser, requestInput);
    const requestWasSuccessful = request.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    const newUser = await findUser(user.username);
    return newUser;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user method- takes in username, the filed being updated and the data
 */
const updateUser = async ({ username, fieldToUpdate, data }) => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
  try {
    const updatableFields = [
      'phone_number',
      'authorization_pin',
      'date_of_birth',
      'status',
      'is_email_verified',
      'refresh_token',
      'email',
      'avatar',
      'identification_number',
      'is_phone_verified',
      'email_verification_code',
      'password',
    ];

    if (!updatableFields.includes(fieldToUpdate)) {
      throw new InternalServerError('The feld you specified is not updatable');
    }
    const userExists = await checkIfUserExists(username);
    if (!userExists) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const timeOfUpdate = new Date().toISOString();
    const requestInput = [data, timeOfUpdate, username];

    // Update authorization pin
    if (fieldToUpdate === 'authorization_pin') {
      const [request] = await database.query(queries.updateAuthorizationPin, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const updatedUser = await findUser(username);
      return Object.freeze({
        username,
        authorization_pin: updatedUser.authorization_pin,
      });
    }

    // Update phone number
    // if (fieldToUpdate === 'phone_number') {
    //   const [request] = await database.query(queries.updatePhoneNumber, requestInput);
    //   const requestWasSuccessful = request.affectedRows > 0;
    //   if (!requestWasSuccessful) {
    //     throw new InternalServerError('Request could not be processed due to an unexpected error');
    //   }
    //   const updatedUser = await findUser(username);
    //   return Object.freeze({
    //     username,
    //     phone_number: updatedUser.phone_number,
    //   });
    // }

    // Update phone number
    if (fieldToUpdate === 'phone_number') {
      if (typeof data !== 'object') {
        throw new InternalServerError('Data must be an object');
      }
      const requestInput = [
        data.phoneNumber,
        data.verificationCode,
        data.verificationCodeExpiration,
        timeOfUpdate,
        username,
      ];
      const [request] = await database.query(queries.updatePhoneNumber, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const updatedUser = await findUser(username);
      return Object.freeze({
        username,
        phone_number: updatedUser.phone_number,
        phone_verification_code: updatedUser.phone_verification_code,
        phone_verification_code_expiration: updatedUser.phone_verification_code_expiration,
      });
    }

    // Update phone number verification status
    if (fieldToUpdate === 'is_phone_verified') {
      const [request] = await database.query(queries.updatePhoneNumberVerificationStatus, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const updatedUser = await findUser(username);
      return Object.freeze({
        username,
        is_email_verified: updatedUser.is_phone_verified,
      });
    }

    // Add date of birth
    if (fieldToUpdate === 'date_of_birth') {
      const { date_of_birth, first_name } = await findUser(username);
      const dateOfBirthHasAlreadyBeenProvided = date_of_birth !== null;
      if (dateOfBirthHasAlreadyBeenProvided) {
        throw new BadRequestError(
          `Hey ${first_name}, for security reasons, we do not allow changes to your date of birth. If you believe that you made an error during sign-up, please contact our support team for assistance. Thank you for your understanding.`,
        );
      }
      const [request] = await database.query(queries.addDateOfBirth, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const updatedUser = await findUser(username);
      return Object.freeze({
        username,
        date_of_birth: updatedUser.date_of_birth,
      });
    }

    // Update email verification status
    if (fieldToUpdate === 'is_email_verified') {
      const [request] = await database.query(queries.updateEmailVerificationStatus, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const updatedUser = await findUser(username);
      return Object.freeze({
        username,
        is_email_verified: updatedUser.is_email_verified,
      });
    }

    // Update email address
    if (fieldToUpdate === 'email') {
      const [request] = await database.query(queries.updateEmail, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const updatedUser = await findUser(username);
      return Object.freeze({
        username,
        email: updatedUser.email,
      });
    }

    // Update refresh token
    if (fieldToUpdate === 'refresh_token') {
      const [request] = await database.query(queries.updateRefreshToken, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const updatedUser = await findUser(username);
      return Object.freeze({
        username,
        refresh_token: updatedUser.refresh_token,
      });
    }

    // Update avatar
    if (fieldToUpdate === 'avatar') {
      const [request] = await database.query(queries.updateAvatar, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const updatedUser = await findUser(username);
      return Object.freeze({
        username,
        avatar: updatedUser.avatar,
      });
    }

    // Update identification number
    // if (fieldToUpdate === 'identification_number') {
    //   if (typeof data !== 'object') {
    //     throw new InternalServerError('Data must be an object');
    //   }
    //   const requestInput = [...Object.values(data), timeOfUpdate, username];
    //   const [request] = await database.query(queries.updateIdentificationNumber, requestInput);
    //   const requestWasSuccessful = request.affectedRows > 0;
    //   if (!requestWasSuccessful) {
    //     throw new InternalServerError('Request could not be processed due to an unexpected error');
    //   }
    //   const updatedUser = await findUser(username);
    //   return Object.freeze({
    //     username,
    //     identification_number: updatedUser.identification_number,
    //     identification_document: updatedUser.identification_document,
    //     identification_document_issuer: updatedUser.identification_document_issuer,
    //     front_image_of_document: updatedUser.front_image_of_document,
    //     back_image_of_document: updatedUser.back_image_of_document,
    //     selfie: updatedUser.selfie,
    //   });
    // }

    // Create/update email verificatiion code
    if (fieldToUpdate === 'email_verification_code') {
      if (typeof data !== 'object') {
        throw new InternalServerError('Data must be an object');
      }
      const requestInput = [data.verificationCode, data.verificationCodeExpiration, timeOfUpdate, username];
      const [request] = await database.query(queries.updateEmailVerificationCode, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const updatedUser = await findUser(username);
      return Object.freeze({
        username,
        email_verification_code: updatedUser.email_verification_code,
        email_verification_code_expiration: updatedUser.email_verification_code_expiration,
      });
    }

    // Update user's password
    if (fieldToUpdate === 'password') {
      const [request] = await database.query(queries.updatePassword, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const updatedUser = await findUser(username);
      return Object.freeze({
        username,
        authorization_pin: updatedUser.password,
      });
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Delete user method
 */
const deleteUser = async (username) => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
  try {
    const requestInput = [username];
    const [request] = await database.query(queries.deleteUser, requestInput);
    const requestWasSuccessful = request.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return Object.freeze({});
  } catch (error) {
    throw error;
  }
};

/**
 * Search user method
 */
const searchUser = async ({ usernameOrEmailOrPhoneNumber, page = 1, sizeOfRecordsToRetrieve = 15 }) => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
  try {
    const searchCriteria = [
      `%${usernameOrEmailOrPhoneNumber}%`,
      `%${usernameOrEmailOrPhoneNumber}%`,
      `%${usernameOrEmailOrPhoneNumber}%`,
    ];
    const pageSize = parseInt(sizeOfRecordsToRetrieve);
    const offset = parseInt((page - 1) * sizeOfRecordsToRetrieve);
    const requestInput = [searchCriteria, pageSize, offset];
    const [queryResponse] = await database.query(queries.searchUser, requestInput);
    const noSearchResult = !queryResponse.length || queryResponse.length === 0;
    if (noSearchResult) {
      return null;
    }
    return Object.freeze({
      page: page.toString(),
      page_size: sizeOfRecordsToRetrieve.toString(),
      data: queryResponse,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * List all users method
 */
const listAllUsers = async ({ page = 1, sizeOfRecordsToRetrieve = 10 }) => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
  try {
    const pageSize = parseInt(sizeOfRecordsToRetrieve);
    const offset = parseInt((page - 1) * sizeOfRecordsToRetrieve);
    const requestInput = [pageSize, offset];
    const [queryResponse] = await database.query(queries.listUsers, requestInput);
    const noRecordOfUsers = !queryResponse.length || queryResponse.length === 0;

    // Reformatting is_email_verified and is_phone_verified properties
    const reformattedUsers = queryResponse.map((user) => ({
      ...user,
      is_email_verified: Boolean(user.is_email_verified),
      is_phone_verified: Boolean(user.is_phone_verified),
    }));
    return noRecordOfUsers
      ? null
      : Object.freeze({
          page: page.toString(),
          page_size: sizeOfRecordsToRetrieve.toString(),
          users: reformattedUsers,
        });
  } catch (error) {
    throw error;
  }
};

const UserRepository = {
  findUser,
  checkIfUserExists,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  listAllUsers,
};

export default UserRepository;
