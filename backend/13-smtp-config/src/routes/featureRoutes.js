import { Router } from 'express';
import { z } from 'zod';
import { sendSuccess } from '../lib/http.js';
import { emailLog, smtpConfig } from '../data/store.js';

const router = Router();

const smtpSchema = z.object({
  host: z.string().min(3),
  port: z.number().int().positive(),
  username: z.string().min(2),
  password: z.string().min(4),
  encryption: z.enum(['tls', 'ssl', 'none']),
  fromEmail: z.string().email(),
});

const testSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(3),
});

router.get('/smtp/config', (_request, response) => {
  sendSuccess(response, smtpConfig);
});

router.put('/smtp/config', (request, response, next) => {
  try {
    const payload = smtpSchema.parse(request.body);
    Object.assign(smtpConfig, payload);
    sendSuccess(response, smtpConfig);
  } catch (error) {
    next(error);
  }
});

router.post('/smtp/test-email', (request, response, next) => {
  try {
    const payload = testSchema.parse(request.body);
    const log = {
      id: `mail-${emailLog.length + 1}`,
      ...payload,
      from: smtpConfig.fromEmail,
      host: smtpConfig.host,
    };
    emailLog.unshift(log);
    sendSuccess(response, log, 201);
  } catch (error) {
    next(error);
  }
});

export default router;
