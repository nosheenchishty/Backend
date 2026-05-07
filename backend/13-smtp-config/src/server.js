import app from './app.js';

const port = Number(process.env.PORT ?? 4113);

app.listen(port, () => {
  console.log('SMTP Config server running on http://localhost:' + port);
});
