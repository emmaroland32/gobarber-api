import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  username: string;
  email: string;
  password: string;
  title?: string;
  firstname: string;
  lastname: string;
  othername?: string;
  phonenumber: string;
  avatar: string;
  pin: string;
  role: 'admin' | 'staff' | 'user';
  data: {};
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({
    username,
    title,
    firstname,
    lastname,
    othername,
    phonenumber,
    email,
    pin,
    password,
    role,
    avatar,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(
      email.toLowerCase(),
    );

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    //TODO: CHeck if username exist

    const hashedPassword = await this.hashProvider.generateHash(password);
    const hashedPin = await this.hashProvider.generateHash(pin);
    const Title = await this.usersRepository.capitalize(title!);
    const Email = email.toLowerCase();
    const Firstname = await this.usersRepository.capitalize(firstname);
    const Lastname = await this.usersRepository.capitalize(lastname);
    const Othername = await this.usersRepository.capitalize(othername!);
    const displayName = Firstname + ' ' + Lastname;
    const data = {
      displayName: displayName,
      avatar: avatar,
      settings: {
        layout: {
          style: 'layout1',
          config: {
            scroll: 'content',
            navbar: {
              display: true,
              folded: true,
              position: 'left',
            },
            toolbar: {
              display: true,
              style: 'fixed',
              position: 'below',
            },
            footer: {
              display: true,
              style: 'fixed',
              position: 'below',
            },
            mode: 'fullwidth',
          },
        },
        customScrollbars: true,
        theme: {
          main: 'defaultDark',
          navbar: 'defaultDark',
          toolbar: 'defaultDark',
          footer: 'defaultDark',
        },
      },
      shortcuts: ['calendar', 'mail', 'contacts'],
    };

    const user = await this.usersRepository.create({
      username,
      title: Title,
      firstname: Firstname as string,
      lastname: Lastname as string,
      othername: Othername,
      phonenumber,
      email: Email,
      pin: hashedPin,
      password: hashedPassword,
      role,
      data,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');
    return user;
  }
}

export default CreateUserService;
