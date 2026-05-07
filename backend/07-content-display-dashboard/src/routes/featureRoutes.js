import { Router } from 'express';
import { sendSuccess } from '../lib/http.js';
import { dashboard } from '../data/store.js';

const router = Router();

router.get('/dashboard/summary', (_request, response) => {
  sendSuccess(response, dashboard.summary);
});

router.get('/dashboard/activity', (_request, response) => {
  sendSuccess(response, dashboard.activity);
});

router.get('/dashboard/insights', (_request, response) => {
  sendSuccess(response, dashboard.insights);
});

export default router;
