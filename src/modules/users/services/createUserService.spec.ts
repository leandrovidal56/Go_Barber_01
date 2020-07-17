import AppError from '@shared/erros/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './createUserService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

describe('CreateUsers test', () => {
  it('teste create user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123123',
    });
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('password');
    expect(user.name).toBe('Fulano');
    expect(user.email).toBe('fulano@email.com');
  });

  it('create user in equal email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123123',
    });
    expect(
      createUserService.execute({
        name: 'Fulano',
        email: 'fulano@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
