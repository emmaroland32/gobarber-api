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

import User from '@modules/users/infra/typeorm/entities/User';
import Debit from './Debit';
import Credit from './Credit';

@Entity('transactions')
class Transaction  {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(type => Debit, debit => debit.transaction)
  @JoinColumn({ name: 'debit_id' })
  debit: Debit;

  @OneToOne(type => Credit, credit => credit.transaction)
  @JoinColumn({ name: 'credit_id' })
  credit: Credit;

  @Column()
  type: string;

  @Column('float')
  amount: number;

  @Column('float')
  opening_balance: number;

  @Column('float')
  closing_balance: number;

  @Column('float')
  balance: number;

  @Column()
  description: number;

  @Column('timestamp with time zone', { nullable: true })
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
