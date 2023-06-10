import { AlreadyExistsError } from '../../../utils/error-responses';
import { loadSqlQueries } from '../../../utils/helpers';
import client from '../connection';

export default function FileRepository() {
  // Get file
  const findFile = async (id) => {
    const database = await client.connectToMySqlDb();
    const queries = await loadSqlQueries({ sqlFolder: 'database/mysql/queries' });
    try {
      const requestInput = [id];
      const [queryResponse] = await database.query(queries.findFile, requestInput);
      const fileDoesNotExist = !queryResponse.length || queryResponse.length === 0;
      return fileDoesNotExist ? null : Object.freeze(queryResponse[0]);
    } catch (error) {
      throw error;
    }
  };

  // Check if user exists
  const checkIfFileExists = async (id) => {
    try {
      const user = await findFile(id);
      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  // Create new file
  const createFile = async (file) => {
    const database = await client.connectToMySqlDb();
    const queries = await loadSqlQueries({ sqlFolder: 'database/mysql/queries' });
    try {
      const fileAlreadyExists = await checkIfFileExists(file.id);
      if (fileAlreadyExists) {
        throw new AlreadyExistsError('File already exists');
      }
      const requestInput = Object.values(file);
      const [request] = await database.query(queries.createFile, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      const newFile = await findFile(file.id);
      return newFile;
    } catch (error) {
      throw error;
    }
  };

  // Delete file
  const deleteFile = async (id) => {
    const database = await client.connectToMySqlDb();
    const queries = await loadSqlQueries({ sqlFolder: 'database/mysql/queries' });
    try {
      const requestInput = [id];
      const [request] = database.query(queries.deleteFile, requestInput);
      const requestWasSuccessful = request.affectedRows > 0;
      if (!requestWasSuccessful) {
        throw new InternalServerError('Request could not be processed due to an unexpected error');
      }
      return Object.freeze({});
    } catch (error) {
      throw error;
    }
  };

  return {
    findFile,
    createFile,
    checkIfFileExists,
    deleteFile,
  };
}
