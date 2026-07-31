import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

import { db } from '#config/database.js';
import { users } from '#models/user.model.js';
import { asyncHandler } from '#middleware/asyncHandler.js';
import { validateBody } from '#middleware/validate.js';
import { createUserSchema } from '#validations/users.validation.js';
import { HttpError } from '#errors/httpError.js';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const result = await db
      .select({ id: users.id, name: users.name, email: users.email, role: users.role })
      .from(users);

    res.status(200).json({ data: result });
  })
);

router.post(
  '/',
  validateBody(createUserSchema),
  asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
    if (existing.length > 0) throw new HttpError(409, 'Email already exists');

    const passwordHash = await bcrypt.hash(password, 12);

    const inserted = await db
      .insert(users)
      .values({ name, email, password: passwordHash, role })
      .returning({ id: users.id, name: users.name, email: users.email, role: users.role });

    res.status(201).json({ data: inserted[0] });
  })
);

export default router;
