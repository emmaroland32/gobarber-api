import { getRepository, Repository } from 'typeorm';
import IDebitsRepository from '@modules/transactions/repositories/IDebitsRepository';
import ICreateDebitCreditDTO from '@modules/transactions/dtos/ICreateDebitCreditDTO';
import Debit from '../entities/Debit';

class DebitsRepository implements IDebitsRepository {
  private ormRepository: Repository<Debit>;

  constructor() {
    this.ormRepository = getRepository(Debit);
  }

  public async create({
    amount,
    date,
    type,
    user_id,
    user,
  }: ICreateDebitCreditDTO): Promise<Debit> {
    const debit = this.ormRepository.create({
      amount,
      type,
      date,
      user_id,
      user,
    });

    await this.ormRepository.save(Debit);

    return debit;
  }

  public async findDebitsByUserId(
    user_id: string,
  ): Promise<Debit[] | undefined> {
    let debits: Debit[];
    debits = await this.ormRepository.find({ where: { user_id } });
    return debits;
  }

  public async findAllDebits(): Promise<Debit[] | undefined> {
    return await this.ormRepository.find({});
  }

  public async findDebitById(id: string): Promise<Debit | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async sumUserDebits(user_id: string): Promise<number> {
    let debits: Debit[];

    debits = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return debits
      .map(debit => debit.amount)
      .reduce((prevValue, currValue) => prevValue + currValue, 0);
  }

  public async save(debit: ICreateDebitCreditDTO): Promise<Debit> {
    return await this.ormRepository.save(debit as any);
  }
}

export default DebitsRepository;
