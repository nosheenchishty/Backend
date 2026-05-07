import { Router } from 'express';
import { z } from 'zod';
import { sendSuccess } from '../lib/http.js';
import { defaultSettings, settings } from '../data/store.js';

const router = Router();

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  language: z.enum(['English', 'Urdu', 'Arabic']),
  density: z.enum(['comfortable', 'compact']),
  profileVisibility: z.enum(['private', 'team', 'public']),
  analytics: z.boolean(),
  marketingEmails: z.boolean(),
});

router.get('/settings', (_request, response) => {
  sendSuccess(response, settings);
});

router.put('/settings', (request, response, next) => {
  try {
    const payload = settingsSchema.parse(request.body);
    Object.assign(settings, payload);
    sendSuccess(response, settings);
  } catch (error) {
    next(error);
  }
});

router.post('/settings/reset', (_request, response) => {
  Object.assign(settings, defaultSettings);
  sendSuccess(response, settings);
});

export default router;
