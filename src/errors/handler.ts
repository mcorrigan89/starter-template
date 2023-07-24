import { ErrorTypeGeneric } from './errors';

export const handleError = (e: unknown) => {
  if (e instanceof ErrorTypeGeneric) {
    return { code: e.code, message: e.errorMessage, type: e.errorType };
  } else if (e instanceof Error) {
    return { code: 500, message: e.message, type: 'InternalServerError' };
  } else {
    throw e;
  }
};
