import { loadSqlQueries } from '../../utils/helpers';
import client from './connection';

const createUserWalletTable = async () => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'database/MySQL/schema' });
  try {
    await database.query(queries.userWallet);
    console.log(`Table "users_wallet" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "users_wallet" already exists`);
      return;
    }
    throw error;
  }
};

const createUserDepositsTable = async () => {
  const database = await client.connectToMySqlDb();
  const queries = await loadSqlQueries({ sqlFolder: 'database/MySQL/schema' });
  try {
    await database.query(queries.usserDeposit);
    console.log(`Table "users_deposits_ledger" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "users_deposits_ledger" already exists`);
      return;
    }
    throw error;
  }
};
