import { loadSqlQueries } from '../../../utils/helpers';
import client from '../connection';

export async function createUsersAddressTable() {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'database/mysql/schema' });
  try {
    await database.query(queries.userAddress);
    console.log(`Table "users_address" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "users_address" already exists`);
      return;
    }
    throw error;
  }
}
