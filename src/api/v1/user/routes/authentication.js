import asyncHandler from '../../../../middleware/async-handler';
import { expressWrapper } from '../../../../utils/helpers';
import { authController } from '../controllers/auth-controller';

async function register(server) {
  const requests = expressWrapper(server);

  const signupRequest = {
    method: 'POST',
    path: '/user/signup',
    controller: asyncHandler(authController.signup),
  };

  requests.route(signupRequest);
}

const userAuthenticationRoutes = {
  register,
};

export default userAuthenticationRoutes;
