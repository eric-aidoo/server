import { createS3BucketTable } from './s3Bucket';
import { createUsersTable } from './users';
import { createUsersAddressTable } from './usersAddress';

export default async function initializeDatabaseTables() {
  await createUsersTable();
  await createS3BucketTable();
  await createUsersAddressTable();
}
