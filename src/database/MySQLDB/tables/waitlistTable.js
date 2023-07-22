import mysqlClient from '../../../config/databaseClient';
import { loadSqlQueries } from '../../../helpers/utilities';

const waitlistTable = async () => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const schema = await loadSqlQueries({ sqlFolder: 'database/mysqlDb/schema' });
    await database.query(schema.waitlist);
    console.log(`Table "waitlist" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "waitlist" already exists`);
      return;
    }
    throw error;
  }
};

export default waitlistTable;
