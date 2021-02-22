import { transEnum } from '@modules/transactions/utils/types/transEnum';
import User from '@modules/users/infra/typeorm/entities/User';
import { tr } from 'date-fns/locale';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import Transaction from './Transaction';

@Entity('debits')
class Debit  {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => Transaction, transaction => transaction.debit)
  transaction: Transaction;

  @Column()
  user_id: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  type: string;

  @Column('float', { nullable: true })
  amount: number;

  @Column({ nullable: true })
  description: number;

  @Column('timestamp with time zone', { nullable: true })
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Debit;
