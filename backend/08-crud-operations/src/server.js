import app from './app.js';

const port = Number(process.env.PORT ?? 4108);

app.listen(port, () => {
  console.log(`CRUD Operations server running on http://localhost:${port}`);
});
