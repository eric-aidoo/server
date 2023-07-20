import mysqlClient from '../../../config/databaseClient';
import {
  AlreadyExistsError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../../../helpers/errors';
import { loadSqlQueries } from '../../../helpers/utilities';

const findUser = async (usernameOrEmail) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const requestInput = [usernameOrEmail];
    const [queryResults] = await database.query(queries.findUser, requestInput);
    const userDoesNotExist = !queryResults.length || queryResults.length === 0;
    const user = queryResults[0];
    return userDoesNotExist ? null : Object.freeze(user);
  } catch (error) {
    throw error;
  }
};

const createUser = async (user) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const userIsNotAnObject = typeof user !== 'object';
    if (userIsNotAnObject) {
      throw new BadRequestError('User must be an object');
    }
    const emailIsAlreadyRegisteredWithAnAccount = await findUser(user.email);
    if (emailIsAlreadyRegisteredWithAnAccount) {
      throw new AlreadyExistsError('Email is already registered with an account. Try logging in instead.');
    }
    const usernameIsAlreadyTaken = await findUser(user.username);
    if (usernameIsAlreadyTaken) {
      throw new AlreadyExistsError('Username already taken');
    }
    const requestInput = Object.values(user);
    const [queryResults] = await database.query(queries.createUser, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'User successfully created',
    };
  } catch (error) {
    throw error;
  }
};

const updateEmail = async ({ username, email }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [email, updatedAt, username];
    const [queryResults] = await database.query(queries.updateEmailAddress, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Email updated',
    };
  } catch (error) {
    throw error;
  }
};

const markEmailAsVerified = async ({ username }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const requestInput = [true, username];
    const [queryResults] = await database.query(queries.makeEmailAsVerified, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Email verified',
    };
  } catch (error) {
    throw error;
  }
};

const updatePhoneNumber = async ({ username, phoneNumber }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [phoneNumber, true, updatedAt, username];
    const [queryResults] = await database.query(queries.updatePhoneNumber, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Phone number updated',
    };
  } catch (error) {
    throw error;
  }
};

const markPhoneAsVerified = async (username) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [true, updatedAt, username];
    const [queryResults] = await database.query(queries.markPhoneAsVerified, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Phone number verified',
    };
  } catch (error) {
    throw error;
  }
};

const updateAuthorizationPin = async ({ username, authorizationPin }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [authorizationPin, updatedAt, username];
    const [queryResults] = await database.query(queries.updateAuthorizationPin, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Authorization pin updated',
    };
  } catch (error) {
    throw error;
  }
};

const uploadFrontImageOfIdCard = async ({ username, imageUrl }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [imageUrl, updatedAt, username];
    const [queryResults] = await database.query(queries.uploadFrontImageOfIdCard, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Front image successfully uploaded',
    };
  } catch (error) {
    throw error;
  }
};

const uploadBackImageOfIdCard = async ({ username, imageUrl }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [imageUrl, updatedAt, username];
    const [queryResults] = await database.query(queries.uploadBackImageOfIdCard, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Back image successfully uploaded',
    };
  } catch (error) {
    throw error;
  }
};

const uploadSelfie = async ({ username, imageUrl }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [imageUrl, updatedAt, username];
    const [queryResults] = await database.query(queries.uploadSelfie, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Selfie successfully uploaded',
    };
  } catch (error) {
    throw error;
  }
};

const markIdentityAsVerified = async (username) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [true, updatedAt, username];
    const [queryResults] = await database.query(queries.markIdentityAsVerified, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Identity verified',
    };
  } catch (error) {
    throw error;
  }
};

const updateRefreshToken = async ({ username, refreshToken }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [refreshToken, updatedAt, username];
    const [queryResults] = await database.query(queries.updateRefreshToken, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Refresh token updated',
    };
  } catch (error) {
    throw error;
  }
};

const updateDateOfBirth = async ({ username, dateOfBirth }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const dateOfBirthHasAlreadyBeenProvided = user.date_of_birth !== null;
    if (dateOfBirthHasAlreadyBeenProvided) {
      throw new BadRequestError(
        `Hey ${user.first_name}, for security reasons, we do not allow changes to your date of birth. If you believe that you made an error during sign-up, please contact our support team for assistance. Thank you for your understanding.`,
      );
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [dateOfBirth, updatedAt, username];
    const [queryResults] = await database.query(queries.updateDateOfBirth, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Date of birth updated',
    };
  } catch (error) {
    throw error;
  }
};

const updatePassword = async ({ username, password }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [password, updatedAt, username];
    const [queryResults] = await database.query(queries.updatePassword, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Password updated',
    };
  } catch (error) {
    throw error;
  }
};

const updateOtpCode = async ({ username, otpCode, otpCodeExpiration }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [otpCode, otpCodeExpiration, updatedAt, username];
    const [queryResults] = await database.query(queries.updateOtpCode, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Otp code updated',
    };
  } catch (error) {
    throw error;
  }
};

const updateUserAvatar = async ({ username, imageUrl }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = [imageUrl, updatedAt, username];
    const [queryResults] = await database.query(queries.updateUserAvatar, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Profile image updated',
    };
  } catch (error) {
    throw error;
  }
};

const deactivateAccount = async (username) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const user = await findUser(username);
    if (!user) {
      throw new NotFoundError(`Hm. We couldn't find an account with that identity.`);
    }
    const updatedAt = new Date().toISOString();
    const requestInput = ['inactive', updatedAt, username];
    const [queryResults] = await database.query(queries.closeAccount, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'Your account is now closed',
    };
  } catch (error) {
    throw error;
  }
};

const usersRepository = {
  findUser,
  createUser,
  updateAuthorizationPin,
  updateDateOfBirth,
  updateEmail,
  updateOtpCode,
  updatePassword,
  updatePhoneNumber,
  updateRefreshToken,
  updateUserAvatar,
  markIdentityAsVerified,
  markPhoneAsVerified,
  markEmailAsVerified,
  uploadFrontImageOfIdCard,
  uploadBackImageOfIdCard,
  uploadSelfie,
  deactivateAccount,
};

export default usersRepository;
