import app from './app.js';

const port = Number(process.env.PORT ?? 4109);

app.listen(port, () => {
  console.log(`Settings & Preferences server running on http://localhost:${port}`);
});
