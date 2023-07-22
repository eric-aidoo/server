import mysqlClient from '../../../config/databaseClient';
import { loadSqlQueries } from '../../../helpers/utilities';

const findUser = async (email) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const requestInput = [email];
    const [queryResults] = await database.query(queries.findUserFromWaitlist, requestInput);
    const userDoesNotExist = !queryResults.length || queryResults.length === 0;
    const user = queryResults[0];
    return userDoesNotExist ? null : Object.freeze(user);
  } catch (error) {
    throw error;
  }
};

const addUser = async (user) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/users/queries' });
    const userIsAnObject = typeof user === 'object';
    if (!userIsAnObject) {
      throw new BadRequestError('User must be an object');
    }
    const emailIsAlreadyRegisteredWithAnAccount = await findUser(user.email);
    if (emailIsAlreadyRegisteredWithAnAccount) {
      throw new AlreadyExistsError('Email is already registered with an account. Try logging in instead.');
    }
    const requestInput = Object.values(user);
    const [queryResults] = await database.query(queries.addUserToWaitlist, requestInput);
    const requestWasSuccessful = queryResults.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Request could not be processed due to an unexpected error');
    }
    return {
      response: 'User added to waitlist',
    };
  } catch (error) {
    throw error;
  }
};

const waitlistRepository = {
  addUser,
  findUser,
};

export default waitlistRepository;
