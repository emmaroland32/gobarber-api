import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the profile', async () => {
    const user1 = await fakeUsersRepository.create({
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      title: 'Mr',
      phonenumber: '+2347030588083',
      pin: '1234',
      username: 'Emmaroland',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      title: 'Mr',
      phonenumber: '+2347030588083',
      pin: '1234',
      username: 'Emmaroland',
      email: 'johntre@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      title: 'Mr',
      phonenumber: '+2347030588083',
      pin: '1234',
      username: 'Emmaroland',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
