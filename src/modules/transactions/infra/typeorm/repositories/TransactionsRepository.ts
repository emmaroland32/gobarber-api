import { getRepository, Repository } from 'typeorm';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create({
    user,
    user_id,
    opening_balance,
    balance,
    date,
    amount,
    closing_balance,
    type,
    credit,
    debit,
    description,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = await this.ormRepository.create({
      user_id,
      opening_balance,
      balance,
      date,
      amount,
      closing_balance,
      type,
      credit,
      debit,
      description,
    } as any);

    await this.ormRepository.save(transaction);

    return transaction as any;
  }

  public async findTransactionsByUserId(
    user_id: string,
  ): Promise<Transaction[] | undefined> {
    let transactions: Transaction[];
    transactions = await this.ormRepository.find({ where: { user_id } });
    return transactions;
  }

  public async findAllTransactions(): Promise<Transaction[] | undefined> {
    return await this.ormRepository.find({});
  }

  public async findTransactionById(
    id: string,
  ): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.findOne(id);

    return transaction;
  }

  public async calculateOpeningBalance(
    sumCredit: number,
    sumDebit: number,
  ): Promise<number> {
    let openingBalance: number;

    openingBalance = sumCredit + sumDebit;

    return openingBalance;
  }

  public async calculateClosingBalance(
    openingBalance: number,
    credit: number,
    debit: number,
  ): Promise<number> {
    const closingBalance = openingBalance + credit - debit;
    return closingBalance;
  }

  public async save(transaction: ICreateTransactionDTO): Promise<Transaction> {
    return await this.ormRepository.save(transaction as any);
  }
}

export default TransactionsRepository;
