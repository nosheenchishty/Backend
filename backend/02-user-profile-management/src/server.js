import app from './app.js';

const port = Number(process.env.PORT ?? 4102);

app.listen(port, () => {
  console.log(`User Profile Management server running on http://localhost:${port}`);
});
