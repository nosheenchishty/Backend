import app from './app.js';

const port = Number(process.env.PORT ?? 4101);

app.listen(port, () => {
  console.log(`User Authentication & Authorization server running on http://localhost:${port}`);
});
