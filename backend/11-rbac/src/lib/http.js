import { ZodError } from 'zod';

export function sendSuccess(response, data, statusCode = 200) {
  response.status(statusCode).json({
    ok: true,
    data,
  });
}

export function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export function notFoundHandler(_request, _response, next) {
  next(createHttpError(404, 'Route not found.'));
}

export function validationErrorHandler(error, _request, response, _next) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      ok: false,
      error: {
        message: 'Validation failed.',
        details: error.flatten(),
      },
    });
  }

  const statusCode = error.statusCode ?? 500;

  return response.status(statusCode).json({
    ok: false,
    error: {
      message: error.message ?? 'Unexpected server error.',
    },
  });
}
