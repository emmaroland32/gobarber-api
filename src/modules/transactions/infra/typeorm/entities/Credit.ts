import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToOne,
  BaseEntity,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Transaction from './Transaction';

@Entity('credits')
class Credit  {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(type => Transaction, transaction => transaction.debit)
  transaction: Transaction;

  @Column()
  type: string;

  @Column('float', { nullable: true })
  amount: number;

  @Column({ nullable: true })
  description: string;

  @Column('timestamp with time zone', { nullable: true })
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Credit;
