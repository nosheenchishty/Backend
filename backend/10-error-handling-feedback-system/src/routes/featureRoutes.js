import { Router } from 'express';
import { z } from 'zod';
import { createHttpError, sendSuccess } from '../lib/http.js';
import { serviceStatus } from '../data/store.js';

const router = Router();

const feedbackSchema = z.object({
  action: z.string().min(3),
  confirmed: z.boolean(),
});

router.get('/system/health', (_request, response) => {
  sendSuccess(response, serviceStatus);
});

router.post('/system/confirm', (request, response, next) => {
  try {
    const payload = feedbackSchema.parse(request.body);
    sendSuccess(response, {
      message: `Action "${payload.action}" was acknowledged.`,
      confirmed: payload.confirmed,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/system/failure-demo', (_request, _response, next) => {
  next(createHttpError(503, 'The demo service is temporarily unavailable.'));
});

export default router;
