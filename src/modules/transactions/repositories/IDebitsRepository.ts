import ICreateAccountDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import ICreateDebitCreditDTO from '../dtos/ICreateDebitCreditDTO';
import Debit from '../infra/typeorm/entities/Debit';
import Transaction from '../infra/typeorm/entities/Transaction';
export default interface IDebitsRepository {
  create(data: ICreateDebitCreditDTO): Promise<Debit>;
  findDebitsByUserId(user_id: string): Promise<Debit[] | undefined>;
  findDebitById(id: string): Promise<Debit | undefined>;
  findAllDebits(): Promise<Debit[] | undefined>;
  sumUserDebits(user_id: string): Promise<number>;
  save(data: ICreateDebitCreditDTO): Promise<Debit>;
}
