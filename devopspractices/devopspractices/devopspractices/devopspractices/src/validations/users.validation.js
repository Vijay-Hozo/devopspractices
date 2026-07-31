import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  password: z.string().min(8).max(255),
  role: z.enum(['user', 'admin']).default('user'),
});
