import { Request, Response, Router } from 'express';
import { DataSource } from 'typeorm';
import { TransactionCategory } from '../models/TransactionCategory';
import { TransactionCategoryController } from '../controllers/TransactionCategoryController';

export const TransactionCategoryRouter = (connection: DataSource) => {
  const router = Router();
  const controller = new TransactionCategoryController(
    connection.getRepository(TransactionCategory)
  );

  router.get('', async (req: Request, res: Response) => {
    return controller.getAll(req, res);
  });

  router.post('', async (req: Request, res: Response) => {
    return controller.create(req, res);
  });

  router.put('/:id', async (req: Request, res: Response) => {
    return controller.update(req, res);
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    return controller.delete(req, res);
  });

  return router;
};
