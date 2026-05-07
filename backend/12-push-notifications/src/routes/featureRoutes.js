import { Router } from 'express';
import { z } from 'zod';
import { createHttpError, sendSuccess } from '../lib/http.js';
import { deliveries, devices } from '../data/store.js';

const router = Router();

const deviceSchema = z.object({
  name: z.string().min(2),
  token: z.string().min(4),
  subscribed: z.boolean(),
});

const pushSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(5),
});

router.get('/push/devices', (_request, response) => {
  sendSuccess(response, devices);
});

router.post('/push/devices', (request, response, next) => {
  try {
    const payload = deviceSchema.parse(request.body);
    const created = { id: `dev-${devices.length + 1}`, ...payload };
    devices.push(created);
    sendSuccess(response, created, 201);
  } catch (error) {
    next(error);
  }
});

router.post('/push/send', (request, response, next) => {
  try {
    const payload = pushSchema.parse(request.body);
    const subscribedDevices = devices.filter((device) => device.subscribed);
    const delivery = {
      id: `push-${deliveries.length + 1}`,
      ...payload,
      recipients: subscribedDevices.length,
    };
    deliveries.unshift(delivery);
    sendSuccess(response, delivery, 201);
  } catch (error) {
    next(error);
  }
});

router.patch('/push/devices/:id/toggle', (request, response, next) => {
  try {
    const device = devices.find((entry) => entry.id === request.params.id);
    if (!device) throw createHttpError(404, 'Device not found.');
    device.subscribed = !device.subscribed;
    sendSuccess(response, device);
  } catch (error) {
    next(error);
  }
});

export default router;
