import { loadSqlQueries } from '../../../utils/helpers';
import client from '../connection.js';

export async function createUsersTable() {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'database/mysql/schema' });
  try {
    await database.query(queries.user);
    console.log(`Table "users" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "users" already exists`);
      return;
    }
    throw error;
  }
}
