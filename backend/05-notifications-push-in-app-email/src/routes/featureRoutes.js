import { Router } from 'express';
import { z } from 'zod';
import { createHttpError, sendSuccess } from '../lib/http.js';
import { notifications, preferences } from '../data/store.js';

const router = Router();

const preferenceSchema = z.object({
  push: z.boolean(),
  inApp: z.boolean(),
  email: z.boolean(),
});

const notificationSchema = z.object({
  title: z.string().min(3),
  channel: z.enum(['Push', 'In-app', 'Email']),
});

router.get('/notifications', (_request, response) => {
  sendSuccess(response, { preferences, notifications });
});

router.post('/notifications', (request, response, next) => {
  try {
    const payload = notificationSchema.parse(request.body);
    const created = { id: notifications.length + 1, ...payload, read: false };
    notifications.unshift(created);
    sendSuccess(response, created, 201);
  } catch (error) {
    next(error);
  }
});

router.patch('/notifications/preferences', (request, response, next) => {
  try {
    const payload = preferenceSchema.parse(request.body);
    Object.assign(preferences, payload);
    sendSuccess(response, preferences);
  } catch (error) {
    next(error);
  }
});

router.patch('/notifications/:id/read', (request, response, next) => {
  try {
    const item = notifications.find((entry) => entry.id === Number(request.params.id));
    if (!item) throw createHttpError(404, 'Notification not found.');
    item.read = true;
    sendSuccess(response, item);
  } catch (error) {
    next(error);
  }
});

export default router;
