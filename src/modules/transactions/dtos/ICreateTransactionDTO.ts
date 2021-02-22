import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateTransactionDTO {
  user: User | undefined;
  user_id: string;
  type: string;
  amount: number;
  opening_balance: number;
  credit: number;
  debit: number;
  closing_balance: number;
  description?: string;
  balance: number;
  date?: Date;
}
