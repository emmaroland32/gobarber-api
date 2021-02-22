import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
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

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.firstname).toBe('Segun');
    expect(profile.lastname).toBe('Iyanda');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
