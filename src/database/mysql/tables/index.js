import { createS3BucketTable } from './s3Bucket';
import { createUsersTable } from './users';
import { createUsersAddressTable } from './usersAddress';
import { createWaitlistUsersTable } from './waitlistUsers';

export default async function initializeDatabaseTables() {
  await createUsersTable();
  await createWaitlistUsersTable();
  await createS3BucketTable();
  await createUsersAddressTable();
}
