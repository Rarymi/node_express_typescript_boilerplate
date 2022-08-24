import express, { json } from 'express';
import 'reflect-metadata';
import { Client } from 'database/client';
import { appRouter } from './routes/routes';
import cors from 'cors';

const db = Client;

db.initialize().then((connection) => {
  const app = express();

  app.use(json());

  app.use(cors({ allowedHeaders: '*', origin: 'http://localhost:3000' }));

  app.use('/api', appRouter(connection));

  app.listen(5000, () => {
    console.log('⚡: Server is running at http://localhost:5000');
  });
});
