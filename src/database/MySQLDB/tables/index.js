import usersTable from './usersTable';
import walletsTable from './walletsTable';

export const initializeSQLTables = async () => {
  await usersTable();
  await walletsTable();
};
