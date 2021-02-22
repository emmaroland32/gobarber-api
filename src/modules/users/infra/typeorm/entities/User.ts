import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

@Entity('users')
class User {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(type => Transaction, transaction => transaction.user)
  transaction: Transaction[];

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  othername: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phonenumber: string;

  @Column({ nullable: true })
  @Exclude()
  pin: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  role: string;

  @Column({ default: false, nullable: true })
  isVerified: boolean;

  @Column({ default: true, nullable: true })
  isEnabled: boolean;

  @Column('jsonb', { nullable: true })
  data: {};

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
