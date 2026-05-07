import { Router } from 'express';
import { z } from 'zod';
import { createHttpError, sendSuccess } from '../lib/http.js';
import { profiles } from '../data/store.js';

const router = Router();

const profileSchema = z.object({
  fullName: z.string().min(2),
  title: z.string().min(2),
  email: z.string().email(),
  location: z.string().min(2),
  bio: z.string().min(10),
});

const preferencesSchema = z.object({
  newsletter: z.boolean(),
  visibility: z.enum(['private', 'team', 'public']),
  timezone: z.string().min(3),
});

router.get('/profiles/:id', (request, response, next) => {
  try {
    const profile = profiles.find((entry) => entry.id === Number(request.params.id));
    if (!profile) throw createHttpError(404, 'Profile not found.');
    sendSuccess(response, profile);
  } catch (error) {
    next(error);
  }
});

router.put('/profiles/:id', (request, response, next) => {
  try {
    const payload = profileSchema.parse(request.body);
    const profile = profiles.find((entry) => entry.id === Number(request.params.id));
    if (!profile) throw createHttpError(404, 'Profile not found.');
    Object.assign(profile, payload);
    sendSuccess(response, profile);
  } catch (error) {
    next(error);
  }
});

router.patch('/profiles/:id/preferences', (request, response, next) => {
  try {
    const payload = preferencesSchema.parse(request.body);
    const profile = profiles.find((entry) => entry.id === Number(request.params.id));
    if (!profile) throw createHttpError(404, 'Profile not found.');
    profile.preferences = payload;
    sendSuccess(response, profile.preferences);
  } catch (error) {
    next(error);
  }
});

export default router;
