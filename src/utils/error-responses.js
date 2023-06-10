export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'bad_request';
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

export class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'already_exists';
    this.name = 'AlreadyExistsError';
    this.statusCode = 409;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'not_found';
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'authorization_required';
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

export class ServiceUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'service_unavailable';
    this.name = 'ServiceUnavailableError';
    this.statusCode = 451;
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'internal_server_error';
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

export class MissingFieldError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'missing_field';
    this.name = 'MissingFieldError';
    this.statusCode = 400;
  }
}

export class TooManyRequestsError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'too_many_requests';
    this.name = 'TooManyRequestsError ';
    this.statusCode = 429;
  }
}

export class PayloadTooLargeError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'payload_too_large';
    this.name = 'PayloadTooLargeError';
    this.statusCode = 413;
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'request_denied';
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 'unprocessable_entity';
    this.name = 'ValidationError';
    this.statusCode = 422;
  }
}
