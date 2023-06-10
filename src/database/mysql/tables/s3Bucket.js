import { loadSqlQueries } from '../../../utils/helpers';
import client from '../connection.js';

export async function createS3BucketTable() {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'database/mysql/schema' });
  try {
    await database.query(queries.file);
    console.log(`Table "s3_bucket" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "s3_bucket" already exists`);
      return;
    }
    throw error;
  }
}
