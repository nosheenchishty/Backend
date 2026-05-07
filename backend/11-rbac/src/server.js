import app from './app.js';

const port = Number(process.env.PORT ?? 4111);

app.listen(port, () => {
  console.log('RBAC server running on http://localhost:' + port);
});
