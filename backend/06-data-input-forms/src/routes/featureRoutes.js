import { Router } from 'express';
import { z } from 'zod';
import { sendSuccess } from '../lib/http.js';
import { submissions } from '../data/store.js';

const router = Router();

const submissionSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  purpose: z.enum(['feedback', 'registration', 'transaction']),
  budget: z.enum(['under-1000', '1000-5000', '5000-plus']),
  notes: z.string().trim().min(15),
  termsAccepted: z.literal(true),
});

router.post('/forms/submissions', (request, response, next) => {
  try {
    const payload = submissionSchema.parse(request.body);
    const created = {
      id: submissions.length + 1,
      submittedAt: new Date().toISOString(),
      ...payload,
    };
    submissions.push(created);
    sendSuccess(response, created, 201);
  } catch (error) {
    next(error);
  }
});

router.get('/forms/submissions', (_request, response) => {
  sendSuccess(response, submissions);
});

export default router;
