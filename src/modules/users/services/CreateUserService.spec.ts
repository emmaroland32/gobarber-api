import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to craete a new user', async () => {
    const user = await createUser.execute({
      username: 'Emmaroland',
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      phonenumber: '+2347030588083',
      title: 'Mr',
      pin: '1234',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      username: 'Emmaroland',
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      phonenumber: '+2347030588083',
      title: 'Mr',
      pin: '1234',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        username: 'Emmaroland',
        firstname: 'Segun',
        lastname: 'Iyanda',
        othername: 'Emmanuel',
        phonenumber: '+2347030588083',
        title: 'Mr',
        pin: '1234',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
