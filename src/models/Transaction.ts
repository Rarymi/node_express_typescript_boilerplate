import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { TransactionCategory } from './TransactionCategory';

enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.OUTCOME,
  })
  type: TransactionType;

  @ManyToOne(() => TransactionCategory)
  category: TransactionCategory;

  @Column({
    nullable: true,
  })
  title: string;

  @CreateDateColumn()
  transactionDate: Date;

  @Column()
  total: number;

  @ManyToOne(() => User)
  user: User;
}
