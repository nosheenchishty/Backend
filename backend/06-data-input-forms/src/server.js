import app from './app.js';

const port = Number(process.env.PORT ?? 4106);

app.listen(port, () => {
  console.log(`Data Input & Forms server running on http://localhost:${port}`);
});
