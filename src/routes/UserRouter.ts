import { Request, Response, Router } from 'express';
import { User } from 'models/User';
import { DataSource } from 'typeorm';
import { UserController } from 'controllers/UserController';

export const UserRouter = (connection: DataSource) => {
  const router = Router();
  const controller = new UserController(connection.getRepository(User));

  router.get('', async (req: Request, res: Response) => {
    return controller.getAll(req, res);
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
