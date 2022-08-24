import { Router } from 'express';
import { UserRouter } from './UserRouter';
import { DataSource } from 'typeorm';
import { TransactionCategoryRouter } from './TransactionCategoryRouter';
import { TransactionRouter } from './TransactionRouter';

export const appRouter = (connection: DataSource) => {
  const router = Router();

  router.use('/users', UserRouter(connection));
  router.use('/transactionCategories', TransactionCategoryRouter(connection));
  router.use('/transactions', TransactionRouter(connection));

  return router;
};
