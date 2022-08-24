import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class TransactionCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToOne(() => User)
  user: User;
}
