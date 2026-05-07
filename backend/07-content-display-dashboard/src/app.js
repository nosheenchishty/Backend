import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import featureRouter from './routes/featureRoutes.js';
import { notFoundHandler, sendSuccess, validationErrorHandler } from './lib/http.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_request, response) => {
  sendSuccess(response, {
    service: 'content-display-dashboard',
    status: 'ok',
  });
});

app.use('/api', featureRouter);
app.use(notFoundHandler);
app.use(validationErrorHandler);

export default app;
