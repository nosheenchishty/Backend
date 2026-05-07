import app from './app.js';

const port = Number(process.env.PORT ?? 4104);

app.listen(port, () => {
  console.log(`Search & Filtering server running on http://localhost:${port}`);
});
