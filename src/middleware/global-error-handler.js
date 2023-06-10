import {
  AlreadyExistsError,
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  MissingFieldError,
  NotFoundError,
  PayloadTooLargeError,
  ServiceUnavailableError,
  TooManyRequestsError,
  UnauthorizedError,
  ValidationError,
} from '../utils/error-responses';

export default function errorHandler(error, req, res, next) {
  console.error(error.message);
  if (error instanceof BadRequestError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: error.message,
    });
  }

  if (error instanceof MissingFieldError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: error.message,
    });
  }

  if (error instanceof AlreadyExistsError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: error.message,
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: error.message,
    });
  }

  if (error instanceof UnauthorizedError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: error.message,
    });
  }

  if (error instanceof ServiceUnavailableError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: error.message,
    });
  }

  if (error instanceof TooManyRequestsError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: error.message,
    });
  }

  if (error instanceof PayloadTooLargeError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: error.message,
    });
  }

  if (error instanceof ForbiddenError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: error.message,
    });
  }

  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: error.message,
    });
  }

  if (error instanceof InternalServerError) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      description: 'Internal Server Error',
    });
  }

  return res.status(500).json({
    error: 'internal_server_error',
    description: 'Internal Server Error',
  });
}
