import { initializeSQLTables } from './mysqlDb/tables';

const initializeTables = async ({ typeOfDatabase }) => {
  try {
    const isSQLDatabase = typeOfDatabase === 'SQL' || typeOfDatabase === 'MySQL';
    if (isSQLDatabase) {
      return await initializeSQLTables();
    }
    const isMongoDatabase = typeOfDatabase === 'MongoDB' || typeOfDatabase === 'Mongo';
    if (isMongoDatabase) {
      return;
    }
    return;
  } catch (error) {
    throw error;
  }
};

// dataCollectionJurisdiction

const database = {
  initializeTables,
};

export default database;
