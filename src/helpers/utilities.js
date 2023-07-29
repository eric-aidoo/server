import path from 'path';
import config from '../config/appConfig';
import libraries from './libraries';
import { ForbiddenError, UnauthorizedError } from './errors';

export function generateToken({ lengthOfToken }) {
  const cryptoGeneratedString = libraries.crypto.randomBytes(22).toString('hex');
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${cryptoGeneratedString}`;
  let len = characters.length;
  var token = '';
  for (let i = 0; i < lengthOfToken; i++) {
    token += characters.charAt(Math.floor(Math.random() * len));
  }
  return token;
}

export function generateOtpCode() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const firstChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  let remainingDigits = '';
  for (let i = 0; i < 4; i++) {
    remainingDigits += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  const otpCode = `${firstChar}-${remainingDigits}`;
  return otpCode;
}

export async function loadSqlQueries({ sqlFolder }) {
  const filePath = path.join(process.cwd(), 'src', sqlFolder);
  const files = await libraries.fsPromises.readdir(filePath, { withFileTypes: true });
  const sqlFiles = files.filter((f) => f.isFile() && f.name.endsWith('.sql')).map((f) => f.name);
  const queries = {};
  for (const sqlFile of sqlFiles) {
    const query = await libraries.fsPromises.readFile(path.join(filePath, sqlFile), { encoding: 'utf-8' });
    queries[sqlFile.replace('.sql', '')] = query;
  }
  return queries;
}

export async function loadEmailTemplates(templatesFolder) {
  const filePath = path.join(process.cwd(), 'src', templatesFolder);
  const files = await libraries.fsPromises.readdir(filePath, { withFileTypes: true });
  const htmlFiles = files.filter((f) => f.isFile() && f.name.endsWith('.html')).map((f) => f.name);
  const templates = {};
  for (const htmlFile of htmlFiles) {
    const query = await libraries.fsPromises.readFile(path.join(filePath, htmlFile), { encoding: 'utf-8' });
    templates[htmlFile.replace('.html', '')] = query;
  }
  return templates;
}

export function createAuditTrail({ event, description, affectedTables, trailedEntityId, oldData, newData }) {
  const auditTrail = Object.freeze({
    id: `at_${generateToken({ lengthOfToken: 26 })}`,
    event,
    description,
    affectedTables: JSON.stringify(affectedTables),
    trailedEntityId,
    oldData: JSON.stringify(oldData),
    newData: JSON.stringify(newData),
    timestamp: new Date().toISOString(),
  });
  return Object.values(auditTrail);
}

export const serviceableCountries = /^(US)$/;

export function capitalize(word) {
  if (!word) return null;
  const words = word.split(' ');
  const capitalizeWords = words.map(capitalizeFirstLetters);
  function capitalizeFirstLetters(element) {
    return element.charAt(0).toLocaleUpperCase() + element.slice(1).toLowerCase();
  }
  const capitalizedWord = capitalizeWords.join(' ');
  return capitalizedWord;
}

export const sanitize = (string) => {
  if (!string) return null;
  const specialCharacters = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '!': '&#x21;',
  };
  const regex = /[&<>"'`=!/]/gi;
  return string.replace(regex, (match) => specialCharacters[match]);
};

export function generateHash(string) {
  try {
    if (!string) {
      return null;
    }
    const appIsInDevMode = config.server.isInDevMode;
    if (appIsInDevMode) {
      const salt = libraries.bcrypt.genSaltSync(10);
      const hashedstring = libraries.bcrypt.hashSync(string, salt);
      return hashedstring;
    }
    const salt = libraries.bcrypt.genSaltSync(13);
    const hashedstring = libraries.bcrypt.hashSync(string, salt);
    return hashedstring;
  } catch (error) {
    throw error;
  }
}

export async function compareHash(string, hashedString) {
  try {
    return await libraries.bcrypt.compare(string, hashedString);
  } catch (error) {
    throw error;
  }
}

export function standardizeDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-CA');
}

export function encrypt(data) {
  const encryptionAlgorithm = 'aes-256-gcm';
  try {
    const secretKey = config.encryption.secret;
    const iv = generateToken({ lengthOfToken: 12 });
    const encrypter = libraries.crypto.createCipheriv(encryptionAlgorithm, secretKey, iv);
    let encryptedData = encrypter.update(JSON.stringify(data), 'utf8', 'hex');
    encryptedData += encrypter.final('hex');
    const authTag = encrypter.getAuthTag().toString('hex');
    return `${encryptedData}.${iv}.${authTag}`;
  } catch (error) {
    throw error;
  }
}

export function decrypt(encryptedData) {
  const encryptionAlgorithm = 'aes-256-gcm';
  try {
    const secretKey = config.encryption.secret;
    const encryptedMessage = encryptedData.split('.')[0];
    const iv = encryptedData.split('.')[1];
    const tag = Buffer.from(encryptedData.split('.')[2], 'hex');
    const decrypter = libraries.crypto.createDecipheriv(encryptionAlgorithm, secretKey, iv);
    decrypter.setAuthTag(tag);
    let decryptedData = decrypter.update(encryptedMessage, 'hex', 'utf8');
    decryptedData += decrypter.final('utf8');
    return JSON.parse(decryptedData);
  } catch (error) {
    throw error;
  }
}

export function getBearerToken(authorizationHeader) {
  const authSchemeIsBearer = authorizationHeader.startsWith('Bearer ');
  if (!authSchemeIsBearer) {
    throw new UnauthorizedError('Invalid authorization scheme');
  }
  const bearerToken = authorizationHeader.split(' ')[1];
  if (!bearerToken || bearerToken.trim() === '') {
    throw new UnauthorizedError('Authorization required');
  }
  return bearerToken;
}

export function generateAccessToken(username) {
  try {
    const payload = {};
    const options = {
      expiresIn: config.oAuth.accessTokenExpiration,
      issuer: config.server.host,
      audience: username,
    };
    const jwtAccessToken = libraries.jwt.sign(payload, config.oAuth.accessTokenSecret, options);
    return jwtAccessToken;
  } catch (error) {
    throw error;
  }
}

export function generateRefreshToken(username) {
  try {
    const payload = {};
    const options = {
      expiresIn: config.oAuth.refreshTokenExpiration,
      issuer: config.server.host,
      audience: username,
    };
    const refreshToken = libraries.jwt.sign(payload, config.oAuth.refreshTokenSecret, options);
    return refreshToken;
  } catch (error) {
    throw error;
  }
}

export function setCookie({ responseObject, cookieName, refreshToken }) {
  responseObject.cookie(cookieName, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: config.oAuth.cookieMaxAge,
    path: '/',
  });
}

export function deleteCookie({ responseObject, cookieName }) {
  responseObject.clearCookie(cookieName, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
}

export function verifyRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    libraries.jwt.verify(refreshToken, config.oAuth.refreshTokenSecret, (error, payload) => {
      if (error) {
        reject(new ForbiddenError('Your request was denied'));
      } else {
        const username = payload.aud;
        resolve(username);
      }
    });
  });
}

export function generatePasswordResetLink({ email, username, password }) {
  try {
    const secret = config.oAuth.passwordResetLinkSecret + password;
    const payload = {
      email,
      id: username,
    };
    const options = {
      expiresIn: config.oAuth.accessTokenExpiration,
      issuer: config.server.host,
      audience: username,
    };
    const token = libraries.jwt.sign(payload, secret, options);
    const passwordResetLink = `${config.server.host}/user/reset-password/${username}/${token}`;
    return passwordResetLink;
  } catch (error) {
    throw error;
  }
}

export function verifyPasswordResetUrlToken({ password, extractedToken }) {
  try {
    const secret = config.oAuth.passwordResetLinkSecret + password;
    libraries.jwt.verify(extractedToken, secret, (error, payload) => {
      if (error) {
        throw new UnauthorizedError('Your password reset link has expired or is no longer valid');
      }
      const id = payload.aud;
      return id;
    });
  } catch (error) {
    throw error;
  }
}

export function expressWrapper(server) {
  return {
    route: (routeObjects) => {
      routeObjects.forEach((routeObject) => {
        const method = routeObject.method.toLowerCase();
        const path = routeObject.path;
        const middleware = routeObject.middleware || [];
        const controller = routeObject.controller;
        server[method](path, ...middleware, controller);
      });
    },
  };
}

export function deactivateDebuggingInProductionMode() {
  if (!config.server.isInDevMode) {
    console.log = function () {};
  }
}

export function determineIdentityDocumentIssuer(country, documentType) {
  if (!country || !documentType) {
    return null;
  }
  const isUSAndDocumentTypeIsSSN = country === 'US' && documentType === 'SSN';
  if (isUSAndDocumentTypeIsSSN) {
    return 'Social Security Administration';
  }
  const isUSAndDocumentTypeIsEIN = country === 'US' && documentType === 'EIN';
  if (isUSAndDocumentTypeIsEIN) {
    return 'Internal Revenue Service';
  }
  const isGhanaAndDocumentTypeIsEcowasCard =
    (country === 'GH' && documentType === 'GHANA CARD') ||
    documentType === 'ECOWAS CARD' ||
    documentType === 'GHANA (ECOWAS) CARD';
  if (isGhanaAndDocumentTypeIsEcowasCard) {
    return 'National Identification Authority';
  }
  return null;
}

export function determineIdentityDocumentType(country) {
  const documentType = country === 'US' ? 'SSN' : country === 'GH' ? 'GHANA_CARD' : 'UNKNOWN';
  return documentType;
}

export function replaceHtmlPlaceholdersWithDynamicValues({ html, context }) {
  if (!context || Object.keys(context).length === 0) {
    return html;
  }
  let result = html;
  for (const key in context) {
    const placeholder = `{{${key}}}`;
    const value = context[key];
    result = result.replace(new RegExp(placeholder, 'g'), value);
  }
  return result;
}

export function reformatResponse({ originalResponse, unwantedProperties = [], propertiesToModify = {} }) {
  const removeProperty = (obj, property) => {
    const parts = property.split('.');
    const lastPart = parts.pop();
    const nestedObject = parts.reduce((nested, part) => nested[part], obj);
    if (nestedObject && nestedObject.hasOwnProperty(lastPart)) {
      delete nestedObject[lastPart];
    }
  };
  const modifyProperty = (obj, property, newValue) => {
    const parts = property.split('.');
    const lastPart = parts.pop();
    const nestedObject = parts.reduce((nested, part) => nested[part], obj);
    if (nestedObject && nestedObject.hasOwnProperty(lastPart)) {
      nestedObject[lastPart] = newValue;
    } else {
      // Add the property to the nested object if it doesn't exist
      const parentObject = parts.reduce((nested, part) => {
        if (!nested.hasOwnProperty(part)) {
          nested[part] = {};
        }
        return nested[part];
      }, obj);
      parentObject[lastPart] = newValue;
    }
  };
  const modifiedResponse = { ...originalResponse };
  unwantedProperties.forEach((property) => {
    removeProperty(modifiedResponse, property);
  });
  Object.entries(propertiesToModify).forEach(([property, newValue]) => {
    modifyProperty(modifiedResponse, property, newValue);
  });
  return modifiedResponse;
}

export function validateParams(requiredParams, providedParams) {
  if (typeof requiredParams !== 'object' && typeof providedParams !== 'object') {
    return false;
  }
  for (const key in requiredParams) {
    if (!(key in providedParams)) {
      return false;
    }
    const requiredType = requiredParams[key];
    const providedValue = providedParams[key];
    if (typeof providedValue !== requiredType) {
      return false;
    }
  }
  return true;
}

export async function generateFingerprint(request) {
  const TEN_SECONDS_TIMEOUT = 10000;
  const ipScanner = new libraries.IPinfoWrapper(config.ipInfo.accessToken, null, TEN_SECONDS_TIMEOUT);
  const ipAddress = request.ip;
  const geolocation = await ipScanner.lookupIp(ipAddress);
  const userlocation = {
    ip: geolocation.ip,
    hostname: geolocation.hostname,
    city: geolocation.city,
    state: geolocation.region,
    country: geolocation.country,
    loc: geolocation.loc,
    zipCode: geolocation.postal,
    timezone: geolocation.timezone,
  };
  const deviceId = request.headers['user-agent'];
  const language = request.acceptsLanguages().join('');
  const requestTrail = `${deviceId}${ipAddress}${language}${userlocation}`;
  const fingerprint = libraries.crypto.createHash('sha256').update(requestTrail).digest('hex');
  return fingerprint;
}

export const validateUSStateAbbreviation = (stateAbbreviation) => {
  const validUSStateAbbreviations = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  if (!stateAbbreviation || stateAbbreviation.trim() === '') {
    return false;
  }
  if (stateAbbreviation.length !== 2) {
    return false;
  }
  return validUSStateAbbreviations.includes(stateAbbreviation.toUpperCase());
};
