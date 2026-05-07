import { Router } from 'express';
import { z } from 'zod';
import { createHttpError, sendSuccess } from '../lib/http.js';
import { rolePermissions, users } from '../data/store.js';

const router = Router();

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'editor', 'user']).default('user'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

router.get('/auth/roles', (_request, response) => {
  sendSuccess(response, rolePermissions);
});

router.post('/auth/signup', (request, response, next) => {
  try {
    const payload = signupSchema.parse(request.body);
    if (users.some((user) => user.email === payload.email)) {
      throw createHttpError(409, 'A user with this email already exists.');
    }

    const newUser = {
      id: users.length + 1,
      ...payload,
      otp: '654321',
    };

    users.push(newUser);

    sendSuccess(response, { user: { id: newUser.id, email: newUser.email, role: newUser.role }, nextStep: 'verify-otp' }, 201);
  } catch (error) {
    next(error);
  }
});

router.post('/auth/login', (request, response, next) => {
  try {
    const payload = loginSchema.parse(request.body);
    const user = users.find((candidate) => candidate.email === payload.email && candidate.password === payload.password);

    if (!user) {
      throw createHttpError(401, 'Invalid email or password.');
    }

    sendSuccess(response, {
      session: {
        token: `demo-token-${user.id}`,
        role: user.role,
        permissions: rolePermissions[user.role],
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/auth/verify-otp', (request, response, next) => {
  try {
    const payload = otpSchema.parse(request.body);
    const user = users.find((candidate) => candidate.email === payload.email);

    if (!user || user.otp !== payload.otp) {
      throw createHttpError(401, 'OTP verification failed.');
    }

    sendSuccess(response, { verified: true, role: user.role });
  } catch (error) {
    next(error);
  }
});

router.get('/auth/access/:role', (request, response, next) => {
  try {
    const permissions = rolePermissions[request.params.role];
    if (!permissions) {
      throw createHttpError(404, 'Role not found.');
    }

    sendSuccess(response, { role: request.params.role, permissions });
  } catch (error) {
    next(error);
  }
});

export default router;
