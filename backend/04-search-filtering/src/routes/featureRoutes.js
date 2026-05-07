import { Router } from 'express';
import { sendSuccess } from '../lib/http.js';
import { records } from '../data/store.js';

const router = Router();

router.get('/search', (request, response) => {
  const query = String(request.query.q ?? '').toLowerCase();
  const category = String(request.query.category ?? 'All');
  const status = String(request.query.status ?? 'All');
  const sort = String(request.query.sort ?? 'score');

  const results = records
    .filter((record) => {
      const matchesQuery = !query || record.title.toLowerCase().includes(query) || record.category.toLowerCase().includes(query);
      const matchesCategory = category === 'All' || record.category === category;
      const matchesStatus = status === 'All' || record.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    })
    .sort((left, right) => (sort === 'title' ? left.title.localeCompare(right.title) : right.score - left.score));

  sendSuccess(response, { total: results.length, items: results });
});

export default router;
