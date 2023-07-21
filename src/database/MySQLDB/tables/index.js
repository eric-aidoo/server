import usersBillingAddressTable from './usersBillingAddressTable';
import usersTable from './usersTable';
import walletsTable from './walletsTable';

export const initializeSQLTables = async () => {
  await usersTable();
  await walletsTable();
  await usersBillingAddressTable();
};
