import mysqlClient from '../../../config/databaseClient';
import { loadSqlQueries } from '../../../helpers/utilities';

const usersBillingAddressTable = async () => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const schema = await loadSqlQueries({ sqlFolder: 'database/mysqlDb/schema' });
    await database.query(schema.userBillingAddress);
    console.log(`Table "users_billing_address" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "users_billing_address" already exists`);
      return;
    }
    throw error;
  }
};

export default usersBillingAddressTable;
