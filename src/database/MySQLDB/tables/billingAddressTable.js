import mysqlClient from '../client';
import { loadSqlQueries } from '../../../helpers/utilities';

const billingAddressTable = async () => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const schema = await loadSqlQueries({ sqlFolder: 'database/mysqlDb/schema' });
    await database.query(schema.billingAddress);
    console.log(`Table "billing_addresses" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "billing_addresses" already exists`);
      return;
    }
    throw error;
  }
};

export default billingAddressTable;
