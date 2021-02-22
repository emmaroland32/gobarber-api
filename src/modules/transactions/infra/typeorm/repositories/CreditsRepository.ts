import { getRepository, Repository } from 'typeorm';
import Credit from '../entities/Credit';
import ICreateDebitCreditDTO from '@modules/transactions/dtos/ICreateDebitCreditDTO';
import ICreditsRepository from '@modules/transactions/repositories/ICreditsRepository';

class CreditsRepository implements ICreditsRepository {
  private ormRepository: Repository<Credit>;

  constructor() {
    this.ormRepository = getRepository(Credit);
  }

  public async create({
    amount,
    date,
    user_id,
    type,
    description,
    user,
  }: ICreateDebitCreditDTO): Promise<Credit> {
    const credit = this.ormRepository.create({
      amount,
      type,
      user_id,
      user,
      date,
      description,
    });

    await this.ormRepository.save(credit);

    return credit;
  }

  public async findCreditsByUserId(
    user_id: string,
  ): Promise<Credit[] | undefined> {
    let credits: Credit[];
    credits = await this.ormRepository.find({ where: { user_id } });
    return credits;
  }

  public async findAllCredits(): Promise<Credit[] | undefined> {
    return await this.ormRepository.find({});
  }

  public async findCreditById(id: string): Promise<Credit | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async sumUserCredits(user_id: string): Promise<number> {
    let credits: Credit[];
    credits = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return credits
      .map(credit => credit.amount)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  public async save(credit: ICreateDebitCreditDTO): Promise<Credit> {
    return await this.ormRepository.save(credit);
  }
}

export default CreditsRepository;
