import app from './app.js';

const port = Number(process.env.PORT ?? 4107);

app.listen(port, () => {
  console.log(`Content Display / Dashboard server running on http://localhost:${port}`);
});
