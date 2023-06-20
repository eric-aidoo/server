import { AlreadyExistsError, InternalServerError } from '../../../utils/error-responses';
import { loadSqlQueries } from '../../../utils/helpers';
import client from '../connection';

/**
 * Find user method
 */
const findUser = async (emailOrInviteCode) => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
  try {
    const requestInput = [emailOrInviteCode, emailOrInviteCode];
    const [queryResponse] = await database.query(queries.findWaitlistUser, requestInput); // Update the query to 'queries.findUser'
    const userDoesNotExist = !queryResponse.length || queryResponse.length === 0;
    return userDoesNotExist ? null : Object.freeze(queryResponse[0]);
  } catch (error) {
    throw error;
  }
};

// const findUser = async (emailOrInviteCode) => {
//   const database = await client.connectToMySqlDb();
//   const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
//   try {
//     const requestInput = [emailOrInviteCode, emailOrInviteCode];
//     const [queryResponse] = await database.query(queries.findUser, requestInput); // Update the query to 'queries.findUser'
//     const userDoesNotExist = !queryResponse.length || queryResponse.length === 0;
//     return userDoesNotExist ? null : Object.freeze(queryResponse[0]);
//   } catch (error) {
//     throw error;
//   }
// };

/**
 * This method checks if user exists and returns a boolean
 */
const checkIfUserExists = async (email) => {
  try {
    const user = await findUser(email);
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

/**
 * Create user method
 * @returns a newly created user
 */
const createUser = async (user) => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
  try {
    const userAlreadyExists = await checkIfUserExists(user.email);
    if (userAlreadyExists) {
      throw new AlreadyExistsError('You are already on the waitlist');
    }
    const requestInput = Object.values(user);
    const [request] = await database.query(queries.createWaitlistUser, requestInput);
    const requestWasSuccessful = request.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    const newUser = await findUser(user.email);
    return Object.freeze(newUser);
  } catch (error) {
    throw error;
  }
};

/**
 * Delete user method
 * @returns an empty object indicating user is deleted from the database
 */
const deleteUser = async (email) => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
  try {
    try {
      const requestInput = [email];
      const [request] = await database.query(queries.deleteWaitlistUser, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      return Object.freeze({});
    } catch (error) {
      throw error;
    }
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
    const [queryResponse] = await database.query(queries.listWaitlistUsers, requestInput);
    const noRecordOfUsers = !queryResponse.length || queryResponse.length === 0;
    return noRecordOfUsers
      ? null
      : Object.freeze({
          page: page.toString(),
          page_size: sizeOfRecordsToRetrieve.toString(),
          data: queryResponse,
        });
  } catch (error) {
    throw error;
  }
};

/**
 * Update waitlist user's approval to test beta method
 */
const approveUserToTryBeta = async (email) => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'api/v1/user/queries' });
  try {
    const requestInput = [email];
    const [request] = await database.query(queries.approveWaitlistUserToTryBeta, requestInput);
    const requestWasSuccessful = request.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    const updatedUser = await findUser(email);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const WaitlistRepository = {
  createUser,
  findUser,
  checkIfUserExists,
  deleteUser,
  listAllUsers,
  approveUserToTryBeta,
};

export default WaitlistRepository;
