import { initializeSQLTables } from './mysqlDb/tables';

const initializeTables = async ({ typeOfDatabase }) => {
  try {
    const isSQLDatabase = typeOfDatabase === 'SQL' || typeOfDatabase === 'MySQL';
    if (isSQLDatabase) {
      return await initializeSQLTables();
    }
    return;
  } catch (error) {
    throw error;
  }
};

const database = {
  initializeTables,
};

export default database;
