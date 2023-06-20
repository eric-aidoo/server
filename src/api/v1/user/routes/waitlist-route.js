import asyncHandler from '../../../../middleware/async-handler';
import { expressWrapper } from '../../../../utils/helpers';
import { earlyAccessProgramController } from '../controllers/waitlist-controller';

const joinWaitlistRequest = {
  method: 'POST',
  path: '/user/join-waitlist',
  controller: asyncHandler(earlyAccessProgramController.getEarlyAccessToApp),
};

const register = async (server) => {
  const incomingRequests = expressWrapper(server);
  incomingRequests.route([joinWaitlistRequest]);
};

const userEarlyAccessProgramRoutes = {
  register,
};

export default userEarlyAccessProgramRoutes;
