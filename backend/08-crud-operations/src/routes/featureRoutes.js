import { Router } from 'express';
import { z } from 'zod';
import { createHttpError, sendSuccess } from '../lib/http.js';
import { items } from '../data/store.js';

const router = Router();

const itemSchema = z.object({
  name: z.string().min(2),
  status: z.enum(['Draft', 'Published', 'Archived']),
});

router.get('/items', (_request, response) => {
  sendSuccess(response, items);
});

router.post('/items', (request, response, next) => {
  try {
    const payload = itemSchema.parse(request.body);
    const created = { id: items.length + 1, ...payload };
    items.push(created);
    sendSuccess(response, created, 201);
  } catch (error) {
    next(error);
  }
});

router.put('/items/:id', (request, response, next) => {
  try {
    const payload = itemSchema.parse(request.body);
    const item = items.find((entry) => entry.id === Number(request.params.id));
    if (!item) throw createHttpError(404, 'Item not found.');
    Object.assign(item, payload);
    sendSuccess(response, item);
  } catch (error) {
    next(error);
  }
});

router.delete('/items/:id', (request, response, next) => {
  try {
    const index = items.findIndex((entry) => entry.id === Number(request.params.id));
    if (index === -1) throw createHttpError(404, 'Item not found.');
    const [removed] = items.splice(index, 1);
    sendSuccess(response, removed);
  } catch (error) {
    next(error);
  }
});

export default router;
