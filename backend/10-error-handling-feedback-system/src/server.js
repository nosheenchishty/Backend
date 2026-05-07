import app from './app.js';

const port = Number(process.env.PORT ?? 4110);

app.listen(port, () => {
  console.log(`Error Handling & Feedback System server running on http://localhost:${port}`);
});
