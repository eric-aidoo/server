import UserRepository from '../../../../database/mysql/repositories/user-repository';
import EmailService from '../../../../integrations/email/email-service';
import {
  BadRequestError,
  MissingFieldError,
  NotFoundError,
  UnauthorizedError,
} from '../../../../utils/error-responses';
import {
  compareHash,
  decrypt,
  encrypt,
  generateAccessToken,
  generateHash,
  generateOtpCode,
  generatePasswordResetLink,
  generateRefreshToken,
  sanitize,
  verifyPasswordResetJwt,
  verifyRefreshToken,
} from '../../../../utils/helpers';
import UserEntity from '../entities/user';

export default function UserAuthenticationService() {
  const userRepository = UserRepository();
  const emailService = EmailService();

  const signup = async (user) => {
    try {
      const newUser = UserEntity.create(user);
      await userRepository.createUser(newUser);

      const emailVerificationCode = generateOtpCode();

      // Save the email verification code
      const currentDateAndTime = new Date();
      const FIFTEEN_MINUTES = new Date().setMinutes(currentDateAndTime + 15).toString();
      await userRepository.updateUser({
        username: newUser.username,
        fieldToUpdate: 'email_verification_code',
        data: {
          verificationCode: emailVerificationCode,
          codeExpiration: FIFTEEN_MINUTES,
        },
      });

      // Send the email verification code to the user
      await emailService.sendEmailVerificationEmail({
        emailAddress: newUser.email,
        firstName: newUser.first_name,
        verificationCode: emailVerificationCode,
      });

      const encryptedUsername = encrypt(newUser.username);
      const refreshToken = generateRefreshToken(encryptedUsername);

      // Save refresh token
      await userRepository.updateUser({
        username: newUser.username,
        fieldToUpdate: 'refresh_token',
        data: refreshToken,
      });
      const signupSuccessMessage =
        'Check your email for a confirmation code we just sent you and enter it here';
      return { signupSuccessMessage };
    } catch (error) {
      throw error;
    }
  };

  const verifyEmailVerificationCode = async ({ email, verificationCode }) => {
    try {
      if (!(email && verificationCode)) {
        throw new MissingFieldError('Email or verification code is required');
      }
      const user = await userRepository.findUser(email);
      const encryptedUsername = encrypt(user.username);

      const currentTime = new Date();
      const verificationCodeHasExpired = currentTime >= new Date(user.email_verification_code_expiration);
      if (verificationCodeHasExpired) {
        throw new UnauthorizedError('Your verification code has expired or is no longer valid');
      }
      const verificationCodeIsValid = verificationCode === user.email_verification_code;
      if (!verificationCodeIsValid) {
        throw new BadRequestError('Invalid verification code');
      }
      const accessToken = generateAccessToken(encryptedUsername);
      const refreshToken = user.refresh_token;
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  };

  const requestForEmailVerificationCode = async (username) => {
    try {
      if (!username) {
        throw new MissingFieldError('Username is required');
      }
      const verificationCode = generateOtpCode();

      // Save verification code
      const currentDateAndTime = new Date();
      const FIFTEEN_MINUTES = new Date().setMinutes(currentDateAndTime + 15).toString();
      await userRepository.updateUser({
        username: username,
        fieldToUpdate: 'email_verification_code',
        data: {
          verificationCode: verificationCode,
          codeExpiration: FIFTEEN_MINUTES,
        },
      });

      const user = await userRepository.findUser(username);

      // Send the email verification code to the user
      await emailService.sendEmailVerificationEmail({
        emailAddress: user.email,
        firstName: user.first_name,
        verificationCode: verificationCode,
      });
      const successMessage = 'Check your email for a confirmation code we just sent you and enter it here';
      return { successMessage };
    } catch (error) {
      throw error;
    }
  };

  const login = async ({ username, password }) => {
    try {
      if (!(username && password)) {
        throw new MissingFieldError('Username or password is required');
      }
      const user = await userRepository.findUser(username);
      if (!user) {
        throw new NotFoundError(`Hm. We couldn't find an account with that identity`);
      }
      const sanitizedPassword = sanitize(password);
      const passwordIsCorrect = await compareHash(sanitizedPassword, user.password);
      if (!passwordIsCorrect) {
        throw new UnauthorizedError(`We don't recognize this sign in combination`);
      }
      const encryptedUser = encrypt(user.username);
      const accessToken = generateAccessToken(encryptedUser);
      const refreshToken = generateRefreshToken(encryptedUser);

      // Update user's refresh token
      await userRepository.updateUser({
        username: username,
        fieldToUpdate: 'refresh_token',
        data: refreshToken,
      });
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  };

  const renewAccessToken = async (refreshToken) => {
    try {
      if (!refreshToken) {
        throw new UnauthorizedError('Authorization required');
      }
      const username = verifyRefreshToken(refreshToken);
      const user = await userRepository.findUser(username);
      if (!user) {
        throw new ForbiddenError('Request denied');
      }
      const persistedToken = user.refresh_token;
      const providedTokenIsValid = refreshToken === persistedToken;
      if (!providedTokenIsValid) {
        throw new ForbiddenError('Request denied');
      }
      const encryptedUsername = encrypt(user.username);
      const accessToken = generateAccessToken(encryptedUsername);
      return { accessToken };
    } catch (error) {
      throw error;
    }
  };

  const logout = async (refreshToken) => {
    try {
      if (!refreshToken) {
        throw new MissingFieldError('Refresh token is required');
      }
      // Verify and delete refresh token (by simply setting refresh token to null or empty strings)
      const username = verifyRefreshToken(refreshToken);
      await userRepository.updateUser({
        username: username,
        fieldToUpdate: 'refresh_token',
        data: null,
      });
      return;
    } catch (error) {
      throw error;
    }
  };

  // This is the first step in a password reset event
  const requestPasswordResetLink = async (username) => {
    try {
      if (!username) {
        throw new MissingFieldError('Username is required');
      }
      const user = await userRepository.findUser(username);
      if (!user) {
        throw new NotFoundError(`Hm. We couldn't find an account with that identity`);
      }
      // Create a one-time password reset link (expires in 10 minutes)
      const passwordResetLink = generatePasswordResetLink({
        email: user.email,
        username,
        password: user.password,
      });

      await emailService.sendPasswordResetInstructionsEmail({
        emailAddress: user.email,
        firstName: user.first_name,
        passwordResetLink,
      });
      const successMessage =
        'If we find an account that matches the information you submitted, we will send password reset instructions to your email address';
      return { successMessage };
    } catch (error) {
      throw error;
    }
  };

  const verifyPasswordResetLink = async (passwordResetLink) => {
    try {
      if (!passwordResetLink) {
        throw new MissingFieldError('Password reset link is required');
      }
      const id = passwordResetLink.split('/')[2];
      const token = passwordResetLink.split('/')[3];

      // Check if user is registered
      const decryptedUsername = decrypt(id);
      const user = await userRepository.findUser(decryptedUsername);
      if (!user) {
        throw new UnauthorizedError('Invalid password reset link');
      }
      verifyPasswordResetJwt({ userPassword: user.password, extractedToken: token });
      return {
        email: user.email,
      };
    } catch (error) {
      throw error;
    }
  };

  // For security reasons, users will not be allowed to reset password while logged in
  const resetPassword = async ({ username, newPassword }) => {
    try {
      if (!(username && newPassword)) {
        throw new MissingFieldError('Username or password is required');
      }
      const user = await userRepository.findUser(username);
      if (!user) {
        throw new NotFoundError(`Hm. We couldn't find an account with that identity`);
      }
      // Ensure that the new password hasn't been used before
      const sanitizedPassword = sanitize(newPassword);
      const passwordHasBeenUsedBefore = compareHash(sanitizedPassword, user.password);
      if (passwordHasBeenUsedBefore) {
        throw new BadRequestError('Please use a password that has not been used previously');
      }
      // Update user's password on record
      const hashedPassword = generateHash(sanitizedPassword);

      await userRepository.updateUser({
        username: username,
        fieldToUpdate: 'password',
        data: hashedPassword,
      });

      await emailService.sendPasswordResetConfirmationEmail({
        emailAddress: user.email,
        firstName: user.first_name,
      });

      // Initiate an automatic login, once password reset is successful
      return await login({ username: username, password: hashedPassword });
    } catch (error) {
      throw error;
    }
  };
}

/**
 * TODO: Create sendPasswordResetConfirmationEmail() method and the query for updating password as well as its logic in the usersRepository()
 */
