import { Router } from 'express';
import { createHttpError, sendSuccess } from '../lib/http.js';
import { roles, users } from '../data/store.js';

const router = Router();

router.get('/rbac/roles', (_request, response) => {
  sendSuccess(response, roles);
});

router.get('/rbac/users', (_request, response) => {
  sendSuccess(response, users);
});

router.get('/rbac/access/:userId/:permission', (request, response, next) => {
  try {
    const user = users.find((entry) => entry.id === Number(request.params.userId));
    if (!user) throw createHttpError(404, 'User not found.');
    const allowed = roles[user.role]?.includes(request.params.permission) ?? false;
    sendSuccess(response, { user: user.name, role: user.role, allowed });
  } catch (error) {
    next(error);
  }
});

export default router;
