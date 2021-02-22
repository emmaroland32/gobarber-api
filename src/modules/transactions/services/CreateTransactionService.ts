import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Transaction from '../infra/typeorm/entities/Transaction';
import ICreditsRepository from '@modules/transactions/repositories/ICreditsRepository';
import IDebitsRepository from '@modules/transactions/repositories/IDebitsRepository';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';

interface IRequest {
  user_id: string;
  type: string;
  amount: number;
  date?: Date;
  description?: string;
}

@injectable()
export default class CreateTransactionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CreditsRepository')
    private creditsRepository: ICreditsRepository,

    @inject('DebitsRepository')
    private debitsRepository: IDebitsRepository,
  ) {}

  public async execute({
    amount,
    date,
    type,
    user_id,
    description,
  }: IRequest): Promise<Transaction> {
    let id = user_id;
    let credit = 0;
    let debit = 0;
    let opening_balance = 0;
    let sumCredit = 0;
    let sumDebit = 0;
    //Find the user
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }

    //Calculate the sum of all the previous Credits belong to the user
    sumCredit = await this.creditsRepository.sumUserCredits(user_id);
    if (sumCredit === null || sumCredit === undefined) {
      sumCredit = 0;
    }

    //Calculate the sum of all the debits that belong to the user
    sumDebit = await this.debitsRepository.sumUserDebits(user_id);
    if (sumDebit === null || sumDebit === undefined) {
      sumDebit = 0;
    }

    //get the opening balance of the user
    opening_balance = await this.transactionsRepository.calculateOpeningBalance(
      sumCredit,
      sumDebit,
    );

    //Calculate th eclosing balance of the user
    const closing_balance = await this.transactionsRepository.calculateClosingBalance(
      opening_balance,
      credit,
      debit,
    );

    const balance = closing_balance;

   
    //Detect if its a credit or debit transaction and create a debit or credit transaction either way
    if (type === "credit") {
      await this.creditsRepository.create({
        amount,
        user,
        user_id,
        type,
        date,
        description,
      });
      credit = amount;
    } 
    if (type === "debit") {
      await this.debitsRepository.create({
        amount,
        user,
        user_id,
        date,
        type,
        description,

      });
      debit = amount;
    } 
    

    //Create a transaction for the user
    const transaction = await this.transactionsRepository.create({
      user,
      amount,
      user_id,
      type,
      opening_balance,
      credit,
      debit,
      closing_balance,
      balance,
      date,
      description,
    });

    return transaction;
  }
}
