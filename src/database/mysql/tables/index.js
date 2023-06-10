import { createS3BucketTable } from './s3Bucket';
import { createUsersTable } from './users';

export default async function initializeDatabaseTables() {
  await createUsersTable();
  await createS3BucketTable();
}
