export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.code = 'bad_request_error';
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

export class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.code = 'already_exists_error';
    this.name = 'AlreadyExistsError';
    this.statusCode = 409;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = 'not_found_error';
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.code = 'unauthorized_request_error';
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

export class ServiceUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.code = 'service_unavailable_error';
    this.name = 'ServiceUnavailableError';
    this.statusCode = 451;
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.code = 'server_error';
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

export class MissingFieldError extends Error {
  constructor(message) {
    super(message);
    this.code = 'missing_field_error';
    this.name = 'MissingFieldError';
    this.statusCode = 400;
  }
}

export class TooManyRequestsError extends Error {
  constructor(message) {
    super(message);
    this.code = 'rate_limit_exceeded_error';
    this.name = 'TooManyRequestsError ';
    this.statusCode = 429;
  }
}

export class PayloadTooLargeError extends Error {
  constructor(message) {
    super(message);
    this.code = 'payload_too_large_error';
    this.name = 'HeavyPayloadError';
    this.statusCode = 413;
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.code = 'forbidden_request_error';
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.code = 'invalid_request_body_error';
    this.name = 'ValidationError';
    this.statusCode = 422;
  }
}
