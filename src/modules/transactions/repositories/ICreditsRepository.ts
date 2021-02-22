import ICreateDebitCreditDTO from '../dtos/ICreateDebitCreditDTO';
import Credit from '../infra/typeorm/entities/Credit';

export default interface ICreditsRepository {
  create(data: ICreateDebitCreditDTO): Promise<Credit>;
  findCreditsByUserId(user_id: string): Promise<Credit[] | undefined>;
  findCreditById(id: string): Promise<Credit | undefined>;
  findAllCredits(): Promise<Credit[] | undefined>;
  sumUserCredits(user_id: string): Promise<number>;
  save(credit: ICreateDebitCreditDTO): Promise<Credit>;
}
