import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import Transaction from '../infra/typeorm/entities/Transaction';
export default interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  findTransactionsByUserId(user_id: string): Promise<Transaction[] | undefined>;
  findTransactionById(id: string): Promise<Transaction | undefined>;
  findAllTransactions(): Promise<Transaction[] | undefined>;
  calculateOpeningBalance(sumDebit: number, sumCredit: number): Promise<number>;

  calculateClosingBalance(
    openingBalance: number,
    credit: number,
    debit: number,
  ): Promise<number>;

  save(data: ICreateTransactionDTO): Promise<Transaction>;
}
