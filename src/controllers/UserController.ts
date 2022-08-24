import { Repository } from 'typeorm';
import { User } from 'models/User';
import { Request, Response } from 'express';

export class UserController {
  private repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  async getAll(req: Request, res: Response) {
    const users = await this.repository.find({
      where: {
        isActive: true,
      },
    });
    res.status(200).send(users);
  }

  async getById(req: Request, res: Response) {
    const user = await this.repository.findOneBy({
      id: Number(req.params.id),
      isActive: true,
    });

    if (!user) {
      res.status(404).send('user not found');
      return;
    }

    return res.send(user);
  }

  async create(req: Request, res: Response) {
    const user = this.repository.create(req.body);
    const result = await this.repository.save(user);
    return res.send(result);
  }

  async update(req: Request, res: Response) {
    const user = await this.repository.findOneBy({
      id: Number(req.params.id),
      isActive: true,
    });

    if (!user) {
      res.status(404).send('user not found');
      return;
    }

    const updatedUser = await this.repository.merge(user, req.body);
    const result = await this.repository.save(updatedUser);
    return res.send(result);
  }

  async delete(req: Request, res: Response) {
    const user = await this.repository.findOneBy({
      id: Number(req.params.id),
      isActive: true,
    });

    if (!user) {
      res.status(404).send('user not found');
      return;
    }

    const updatedUser = await this.repository.merge(user, { isActive: false });
    const result = await this.repository.save(updatedUser);
    res.send(result);
  }
}
