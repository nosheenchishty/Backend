import app from './app.js';

const port = Number(process.env.PORT ?? 4112);

app.listen(port, () => {
  console.log('Push Notifications server running on http://localhost:' + port);
});
