import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  error: Error | ZodError,
  _request,
  response,
  _next,
) => {
  if (error instanceof ZodError) {
    return response.status(400).json({ message: error.issues });
  }

  const messageAsErrorType = error.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return response.status(httpStatus).json({ error: message });
  }
  return response.status(500).json({ message: 'Internal error' });
};

export default errorHandler;
