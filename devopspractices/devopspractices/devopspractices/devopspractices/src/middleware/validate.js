import { HttpError } from '#errors/httpError.js';

/**
 * Validates req.body against a Zod schema.
 * @param {import('zod').ZodSchema} schema
 */
export const validateBody = schema => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return next(
      new HttpError(400, 'Validation error', {
        issues: result.error.issues,
      })
    );
  }

  req.body = result.data;
  return next();
};
