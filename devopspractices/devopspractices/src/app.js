import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import logger from '#config/logger.js';
import healthRoutes from '#routes/health.routes.js';
import usersRoutes from '#routes/users.routes.js';
import { swaggerSpec } from './swagger.js';
import { errorHandler } from '#middleware/errorHandler.js';
import { HttpError } from '#errors/httpError.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from application' });
});

app.use('/', healthRoutes);
app.use('/api/users', usersRoutes);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404
app.use((req, res, next) => {
  next(new HttpError(404, 'Not Found'));
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
