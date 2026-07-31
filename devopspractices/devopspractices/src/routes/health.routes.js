import { Router } from 'express';
import { db, sql } from '#config/database.js';

const router = Router();

// Liveness probe: the process is up and serving requests
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Readiness probe: app can reach its dependencies (DB)
router.get('/ready', async (req, res) => {
  try {
    // Minimal query; works for Neon/PG
    await sql`select 1 as ok`;
    res.status(200).json({ status: 'ready' });
  } catch (e) {
    res.status(503).json({ status: 'not_ready' });
  }
});

export default router;
