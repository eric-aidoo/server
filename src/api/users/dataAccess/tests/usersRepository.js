import usersDb from '../userRepository';

const userDataAccessTest = {
  getUser: usersDb.findUser,
  createUser: usersDb.createUser,
  addDateOfBirth: usersDb.updateDateOfBirth,
  createOrUpdateAuthorizationPin: usersDb.updateAuthorizationPin,
};

export default userDataAccessTest;
