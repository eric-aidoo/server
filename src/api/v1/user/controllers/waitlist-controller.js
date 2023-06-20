import config from '../../../../config';
import { EarlyAccessService } from '../services/early-access-service';

const getEarlyAccessToApp = async (req, res) => {
  const user = req.body;
  const feedback = await EarlyAccessService.joinWaitlist(user);
  return res.status(201).json({
    success: true,
    api_version: config.api.version,
    data: {
      message: feedback.successMessage,
    },
  });
};

export const earlyAccessProgramController = {
  getEarlyAccessToApp,
};
