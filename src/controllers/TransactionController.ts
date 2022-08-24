import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';

export class TransactionController {
  private repository: Repository<Transaction>;

  constructor(repository: Repository<Transaction>) {
    this.repository = repository;
  }

  async getAll(req: Request, res: Response) {
    const transactions = await this.repository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.category', 'transaction_category')
      .getMany();

    res.status(200).send(transactions);
  }

  async getById(req: Request, res: Response) {
    const transaction = await this.repository.findOneBy({
      id: Number(req.params.id),
    });

    if (!transaction) {
      res.status(404).send('transaction not found');
      return;
    }

    return res.send(transaction);
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    const transaction = this.repository.create(req.body);
    const result = await this.repository.save(transaction);
    return res.send(result);
  }

  async update(req: Request, res: Response) {
    const transaction = await this.repository.findOneBy({
      id: Number(req.params.id),
    });
    if (!transaction) {
      res.status(404).send('transaction not found');
      return;
    }

    const updatedTransaction = await this.repository.merge(
      transaction,
      req.body
    );
    const result = await this.repository.save(updatedTransaction);
    return res.send(result);
  }

  async delete(req: Request, res: Response) {
    const transaction = await this.repository.findOneBy({
      id: Number(req.params.id),
    });
    if (!transaction) {
      res.status(404).send('transaction not found');
      return;
    }

    const updatedTransactionCategory = await this.repository.delete(
      transaction
    );
    res.send('deleted');
  }
}
