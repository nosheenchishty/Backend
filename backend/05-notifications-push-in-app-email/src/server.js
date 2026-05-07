import app from './app.js';

const port = Number(process.env.PORT ?? 4105);

app.listen(port, () => {
  console.log(`Notifications (Push/In-App/Email) server running on http://localhost:${port}`);
});
