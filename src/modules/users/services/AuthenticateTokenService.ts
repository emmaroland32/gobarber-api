import { verify, sign, decode } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserTokensRepositoy from '../repositories/IUserTokensRepository';

interface IRequest {
  id: string;
}

interface IResponse {
  user?: User;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('user not found', 401);
    }

    return {
      user,
    };
  }
}
