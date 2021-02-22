import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
  config: {
    secret: string;
    expiresIn: string;
  };
}

interface IResponse {
  user: User;
  access_token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
    config,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.comapreHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    let payload = {
      id: user.id,
      email: user.email,
    };

    const access_token = await this.usersRepository.generateAccessToken({
      config,
      payload,
    });

    return {
      user,
      access_token,
    };
  }
}
