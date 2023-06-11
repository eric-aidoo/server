import crypto from 'crypto';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { ForbiddenError, UnauthorizedError, ValidationError } from './error-responses';
import config from '../config';
import initializeRedisClient from './redis-client';
import libraries from './libraries';
import FileRepository from '../database/mysql/repositories/file-repository';

export function generateToken({ lengthOfToken }) {
  const cryptoGeneratedString = crypto.randomBytes(22).toString('hex');
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
  const files = await fsPromises.readdir(filePath, { withFileTypes: true });
  const sqlFiles = files.filter((f) => f.isFile() && f.name.endsWith('.sql')).map((f) => f.name);
  const queries = {};
  for (const sqlFile of sqlFiles) {
    const query = await fsPromises.readFile(path.join(filePath, sqlFile), { encoding: 'utf-8' });
    queries[sqlFile.replace('.sql', '')] = query;
  }
  return queries;
}

export async function loadEmailTemplates({ templatesFolder }) {
  const filePath = path.join(process.cwd(), 'src', templatesFolder);
  const files = await fsPromises.readdir(filePath, { withFileTypes: true });
  const htmlFiles = files.filter((f) => f.isFile() && f.name.endsWith('.html')).map((f) => f.name);
  const templates = {};
  for (const htmlFile of htmlFiles) {
    const query = await fsPromises.readFile(path.join(filePath, htmlFile), { encoding: 'utf-8' });
    templates[htmlFile.replace('.html', '')] = query;
  }
  return templates;
}

export function createAuditTrail({ event, description, affectedTables, trailedEntityId, oldData, newData }) {
  const auditTrail = Object.freeze({
    id: `trail_${generateToken({ lengthOfToken: 26 })}`,
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

export function phoneNumberValidator(country) {
  const phoneNumberValidator = {
    US: /^\+1([2-9][0-9]{2})([2-9][0-9]{6})$/,
    // GH: /^\+233([2-9]\d{8})$/,
  };
  const countries = Object.keys(phoneNumberValidator);
  if (!countries.includes(country)) {
    throw new ValidationError(`Invalid or unsupported country code for the specified phone number`);
  }
  return phoneNumberValidator[country];
}

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
    const encrypter = crypto.createCipheriv(encryptionAlgorithm, secretKey, iv);
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
    const decrypter = crypto.createDecipheriv(encryptionAlgorithm, secretKey, iv);
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

export function setCookie({ httpResponseObject, cookieName, refreshToken }) {
  httpResponseObject.cookie(cookieName, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: config.oAuth.cookieMaxAge,
  });
}

export function verifyRefreshToken(refreshToken) {
  try {
    libraries.jwt.verify(refreshToken, config.oAuth.refreshTokenSecret, (error, payload) => {
      if (error) {
        throw new ForbiddenError('Request denied');
      }
      const username = payload.aud;
      return username;
    });
  } catch (error) {
    throw error;
  }
}

export function generatePasswordResetLink({ email, username, password }) {
  try {
    const secret = config.oAuth.passwordResetLinkSecret + password;
    const payload = {};
    const options = {
      expiresIn: config.oAuth.accessTokenExpiration,
      issuer: config.server.host,
      audience: username,
    };
    const token = libraries.jwt.sign(payload, secret, options);
    const passwordResetLink = `${config.server.host}/user/reset-password/${encryptedUsername}/${token}`;
    return passwordResetLink;
  } catch (error) {
    throw error;
  }
}

export function verifyPasswordResetLinkToken({ password, extractedToken }) {
  try {
    const secret = config.oAuth.passwordResetLinkSecret + password;
    // const payload = libraries.jwt.verify(extractedToken, secret);
    // const id = payload.id;
    // return id;
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
    route: (routeObject) => {
      const method = routeObject.method.toLowerCase();
      const path = routeObject.path;
      const middleware = routeObject.middlewares || [];
      const controller = routeObject.controller;
      server[method](path, ...middleware, controller);
    },
  };
}

export function deactivateDebuggingInProductionMode() {
  if (!config.server.isInDevMode) {
    console.log = function () {};
  }
}

export async function uploadFileToS3Bucket(file) {
  const s3Bucket = FileRepository();
  const fileId = generateToken({ lengthOfToken: 16 });
  const fileObject = {
    id: fileId,
    encodedString: file.data,
    fileSize: file.size,
    fileType: file.mimetype,
    originalName: file.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await s3Bucket.createFile(fileObject);
  const imageUrl = `${config.server.host}/s3/file?id=${fileId}`;
  return imageUrl;
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
  // If there are no dynamic values to replace, return the original HTML
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

export async function sendEmail({ emailAddress, template, subject, dynamicValues }) {
  try {
    const emailTransporter = libraries.nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailAuthentication.user,
        pass: config.emailAuthentication.password,
      },
    });

    const emailTemplate = replaceHtmlPlaceholdersWithDynamicValues({
      html: template,
      context: dynamicValues,
    });

    const mail = {
      from: config.emailAuthentication.user,
      to: emailAddress,
      subject: subject,
      html: emailTemplate,
    };
    return await emailTransporter.sendMail(mail);
  } catch (error) {
    throw error;
  }
}
