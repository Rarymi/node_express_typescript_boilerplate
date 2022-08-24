import { Repository } from 'typeorm';
import { TransactionCategory } from '../models/TransactionCategory';
import { Request, Response } from 'express';

export class TransactionCategoryController {
  private repository: Repository<TransactionCategory>;

  constructor(repository: Repository<TransactionCategory>) {
    this.repository = repository;
  }

  async getAll(req: Request, res: Response) {
    const transactionCategories = await this.repository.find();
    res.status(200).send(transactionCategories);
  }

  async create(req: Request, res: Response) {
    const transactionCategory = this.repository.create(req.body);
    const result = await this.repository.save(transactionCategory);
    return res.send(result);
  }

  async update(req: Request, res: Response) {
    const transactionCategory = await this.repository.findOneBy({
      id: Number(req.params.id),
    });
    if (!transactionCategory) {
      res.status(404).send('category not found');
      return;
    }

    const updatedTransactionCategory = await this.repository.merge(
      transactionCategory,
      req.body
    );
    const result = await this.repository.save(updatedTransactionCategory);
    return res.send(result);
  }

  async delete(req: Request, res: Response) {
    const transactionCategory = await this.repository.findOneBy({
      id: Number(req.params.id),
    });
    if (!transactionCategory) {
      res.status(404).send('category not found');
      return;
    }

    const updatedTransactionCategory = await this.repository.delete(
      transactionCategory
    );
    res.send('deleted');
  }
}
