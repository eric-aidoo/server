import { loadSqlQueries } from '../../../utils/helpers';
import client from '../connection';

export async function createWaitlistUsersTable() {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'database/mysql/schema' });
  try {
    await database.query(queries.waitlistUser);
    console.log(`Table "waitlist_users" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "waitlist_users" already exists`);
      return;
    }
    throw error;
  }
}
