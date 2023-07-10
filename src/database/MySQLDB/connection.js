import config from '../../settings/config';
import { InternalServerError } from '../../utils/error-responses';
import libraries from '../../utils/libraries';

const databaseConnection = async () => {
  let pool = null;

  // Close database connection pool
  const closePool = async () => {
    try {
      await pool.end();
      pool = null;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  // Establish a new database connection
  const getConnection = async () => {
    try {
      if (pool) {
        return pool;
      }
      pool = libraries.mysql.createPool(config.mysql.developmentDb);
      pool.on('error', async (error) => {
        console.error(error.message);
        await closePool();
        return;
      });
      const connection = await pool.getConnection();
      connection.release();
      return connection;
    } catch (error) {
      console.error(error.message);
      pool = null;
      throw new InternalServerError('An error occured while connecting to the database');
    }
  };

  const query = async (sql, values) => {
    const connection = await getConnection();
    try {
      const [results] = await connection.query(sql, values);
      connection.release();
      return [results];
    } catch (error) {
      connection.release();
      throw error;
    }
  };

  return {
    query,
  };
};

const client = {
  connectToMySqlDb: databaseConnection,
};

export default client;
