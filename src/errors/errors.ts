export abstract class ErrorTypeGeneric extends Error {
  public code: number;
  public errorMessage: string;
  public errorType: string;
  constructor(message: string) {
    super(message);
    this.code = 0;
    this.errorMessage = message;
  }
}

export class BadRequestError extends ErrorTypeGeneric {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.errorType = 'BadRequestError';
    this.code = 400;
    this.errorMessage = message;
  }
}

export class AuthorizationError extends ErrorTypeGeneric {
  constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
    this.errorType = 'AuthorizationError';
    this.code = 401;
    this.errorMessage = message;
  }
}

export class ForbiddenError extends ErrorTypeGeneric {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.errorType = 'ForbiddenError';
    this.code = 403;
    this.errorMessage = message;
  }
}

export class NotFoundError extends ErrorTypeGeneric {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.errorType = 'NotFoundError';
    this.code = 404;
    this.errorMessage = message;
  }
}

export class InternalServerError extends ErrorTypeGeneric {
  constructor(message: string) {
    super(message);
    this.name = 'InternalServerError';
    this.errorType = 'InternalServerError';
    this.code = 500;
    this.errorMessage = message;
  }
}

export class ServiceUnavailableError extends ErrorTypeGeneric {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceUnavailableError';
    this.errorType = 'ServiceUnavailableError';
    this.code = 503;
    this.errorMessage = message;
  }
}

export class GatewayTimeoutError extends ErrorTypeGeneric {
  constructor(message: string) {
    super(message);
    this.name = 'GatewayTimeoutError';
    this.errorType = 'GatewayTimeoutError';
    this.code = 504;
    this.errorMessage = message;
  }
}
