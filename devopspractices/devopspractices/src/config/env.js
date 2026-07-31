import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  PORT: z.coerce.number().int().min(1).max(65535).optional(),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  LOG_LEVEL: z.string().optional(),
});

export const env = envSchema.parse(process.env);
