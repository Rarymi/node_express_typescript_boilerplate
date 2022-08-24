import { Request, Response, Router } from 'express';
import { DataSource } from 'typeorm';
import { TransactionController } from '../controllers/TransactionController';
import { Transaction } from '../models/Transaction';

export const TransactionRouter = (connection: DataSource) => {
  const router = Router();
  const controller = new TransactionController(
    connection.getRepository(Transaction)
  );

  router.get('', async (req: Request, res: Response) => {
    return controller.getAll(req, res);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    return controller.getById(req, res);
  });

  router.get('/:id', async (req: Request, res: Response) => {
    return controller.getById(req, res);
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
