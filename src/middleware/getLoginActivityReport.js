import { getIpLocation } from '../helpers/utilities';

const getLoginActivityReport = async (req, res) => {
  try {
    const requestLocation = await getIpLocation(req);
    const userAgent = req.headers['user-agent'];

    const browserInfo = userAgent.match(/(Chrome|Safari|Firefox|Edge)\/(\d+)/);
    const osInfo = userAgent.match(/\(([^)]+)\)/);

    const browser = browserInfo ? browserInfo[1] : 'Unknown Browser';
    const os = osInfo ? osInfo[1] : 'Unknown OS';

    const ipAddress = req.ip;
    const deviceId = `${browser} on ${os}`;
    const timeOfLogin = new Date().toLocaleString(undefined, { timeZoneName: 'short' });
    const approximateLocation = requestLocation.city.startsWith('Unknown')
      ? 'Unknown location'
      : `${requestLocation.city}, ${requestLocation.state} ${requestLocation.zipCode}, ${requestLocation.country}`;
    return {
      ipAddress,
      deviceId,
      timeOfLogin,
      approximateLocation,
    };
  } catch (error) {
    throw error;
  }
};

export default getLoginActivityReport;
