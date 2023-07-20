export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.code = 'bad_request';
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

export class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.code = 'already_exists';
    this.name = 'AlreadyExistsError';
    this.statusCode = 409;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = 'not_found';
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.code = 'unauthorized_access';
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

export class ServiceUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.code = 'service_unavailable';
    this.name = 'ServiceUnavailableError';
    this.statusCode = 451;
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.code = 'internal_server_error';
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

export class MissingFieldError extends Error {
  constructor(message) {
    super(message);
    this.code = 'missing_field';
    this.name = 'MissingFieldError';
    this.statusCode = 400;
  }
}

export class TooManyRequestsError extends Error {
  constructor(message) {
    super(message);
    this.code = 'too_many_requests';
    this.name = 'TooManyRequestsError ';
    this.statusCode = 429;
  }
}

export class PayloadTooLargeError extends Error {
  constructor(message) {
    super(message);
    this.code = 'payload_too_large';
    this.name = 'HeavyPayloadError';
    this.statusCode = 413;
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.code = 'request_forbidden';
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.code = 'invalid_request_body';
    this.name = 'ValidationError';
    this.statusCode = 422;
  }
}
