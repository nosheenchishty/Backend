import app from './app.js';

const port = Number(process.env.PORT ?? 4103);

app.listen(port, () => {
  console.log(`Navigation & UI Framework server running on http://localhost:${port}`);
});
