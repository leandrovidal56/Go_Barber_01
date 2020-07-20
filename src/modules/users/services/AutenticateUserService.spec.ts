import AppError from '@shared/erros/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './createUserService';

import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

describe('test for autenticate in aplication', () => {
  it('test autenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123123',
    });

    const response = await authenticateUserService.execute({
      email: 'fulano@email.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');

    expect(response.user).toEqual(user);
  });

  it('test autenticate email does not found', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,

      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Fulano',

      email: 'fulano@email.com',
      password: '123123',
    });
    expect(
      authenticateUserService.execute({
        email: 'fulano1@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('test authenticate password does not match', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,

      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'leandro',
      email: 'leandro@email.com',
      password: '1231234',
    });

    expect(
      authenticateUserService.execute({
        email: 'leandro@email.com',
        password: '873738',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
