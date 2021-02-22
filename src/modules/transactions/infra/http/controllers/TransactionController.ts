import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TransactionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    let { type, amount, date } = req.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      amount,
      type,
      date,
      user_id,
    });

    return res.json(transaction);
  }
}
