import { Router } from 'express';
import { sendSuccess } from '../lib/http.js';
import { navigationShell } from '../data/store.js';

const router = Router();

router.get('/navigation/shell', (_request, response) => {
  sendSuccess(response, navigationShell);
});

router.get('/navigation/sections', (_request, response) => {
  sendSuccess(response, navigationShell.sections);
});

router.get('/navigation/tabs', (_request, response) => {
  sendSuccess(response, navigationShell.tabs);
});

export default router;
