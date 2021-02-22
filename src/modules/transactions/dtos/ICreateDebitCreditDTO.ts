import User from '@modules/users/infra/typeorm/entities/User';
import { transEnum } from '../utils/types/transEnum';

export default interface ICreateDebitCreditDTO {
  amount: number;
  user?: User;
  user_id: string;
  type: string;
  description?: string;
  date?: Date;
}
