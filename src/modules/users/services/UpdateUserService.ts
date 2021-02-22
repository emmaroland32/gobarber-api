import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
  username?: string;
  email?: string;
  title?: string;
  firstname?: string;
  lastname?: string;
  othername?: string;
  phonenumber?: string;
  avatar?: string;
  pin?: string;
  newPin?: string;
  confirmPin?: string;
  role?: 'admin' | 'staff' | 'user';
  data?: {};
  newPassword?: string;
  password?: string;
  confirmPassword?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    username,
    title,
    firstname,
    lastname,
    othername,
    phonenumber,
    pin,
    newPin,
    confirmPin,
    password,
    newPassword,
    confirmPassword,
    role,
    avatar,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (newPassword && !password) {
      throw new AppError('Kindly provide your old password');
    }
    if (newPassword === password) {
      throw new AppError('You cannot change password to your current password');
    }
    if (newPassword !== confirmPassword) {
      throw new AppError('Kindly confirm the right password');
    }

    if (password && newPassword) {
      const checkOldPassword = await this.hashProvider.comapreHash(
        password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(newPassword);
    }

    if (title) {
      user.lastname = title;
    }
    //Update the Users PIN
    if (newPin && !pin) {
      throw new AppError('Kindly provide your old PIN');
    }
    if (newPin && pin && newPin === pin) {
      throw new AppError('You cannot change your PIN to your current PIN');
    }
    if (newPin !== confirmPin) {
      throw new AppError('Kindly confirm the right PIN');
    }

    if (newPin && pin) {
      const checkOldPin = await this.hashProvider.comapreHash(pin, user.pin);
      if (!checkOldPin) {
        throw new AppError('Old pin does not match');
      }
      user.pin = await this.hashProvider.generateHash(newPin);
    }

    if (phonenumber) user.phonenumber = phonenumber;

    if (role) user.role = role;

    if (username) user.username = username;

    if (firstname) user.firstname = firstname;

    if (lastname) user.lastname = lastname;

    if (othername) user.othername = othername;

    const displayName = user.firstname + ' ' + user.lastname;

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

    user.data = data;
    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
