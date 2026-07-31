import logger from '#config/logger.js';

export const errorHandler = (err, req, res, next) => {
  const status = err?.status && Number.isInteger(err.status) ? err.status : 500;

  const response = {
    error: {
      message: status >= 500 ? 'Internal Server Error' : err.message,
    },
  };

  if (err?.details) response.error.details = err.details;

  // log full details server-side
  logger.error('request_error', {
    status,
    message: err?.message,
    stack: err?.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(status).json(response);
};
