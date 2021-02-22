import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      username: 'Emmaroland',
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      phonenumber: '+2347030588083',
      title: 'Mr',
      pin: '1234',
      email: 'seguniyanda@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      firstname: 'Segun',
      lastname: 'Iyanda',
      email: 'seguniyanda@example.com',
    });

    expect(updatedUser.firstname).toBe('Segun');
    expect(updatedUser.lastname).toBe('Iyanda');
    expect(updatedUser.email).toBe('seguniyanda@example.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        firstname: 'Segun',
        lastname: 'Iyanda',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      username: 'Emmaroland',
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      phonenumber: '+2347030588083',
      title: 'Mr',
      pin: '1234',
      email: 'seguniyanda@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      username: 'Emmaroland',
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      phonenumber: '+2347030588083',
      title: 'Mr',
      pin: '1234',
      email: 'seguniyanda@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        firstname: 'Segun',
        lastname: 'Iyanda',
        email: 'seguniyanda@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      username: 'Emmaroland',
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      phonenumber: '+2347030588083',
      title: 'Mr',
      pin: '1234',
      email: 'seguniyanda@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      firstname: 'Segun',
      lastname: 'Iyanda',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      username: 'Emmaroland',
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      phonenumber: '+2347030588083',
      title: 'Mr',
      pin: '1234',
      email: 'seguniyanda@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        firstname: 'Segun',
        lastname: 'Iyanda',
        email: 'seguniyanda@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      username: 'Emmaroland',
      firstname: 'Segun',
      lastname: 'Iyanda',
      othername: 'Emmanuel',
      phonenumber: '+2347030588083',
      title: 'Mr',
      pin: '1234',
      email: 'seguniyanda@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        firstname: 'Segun',
        lastname: 'Iyanda',
        email: 'seguniyanda@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
