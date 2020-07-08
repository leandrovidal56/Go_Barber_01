import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../entities/User';
import Auth from '../../../config/auth';
import AppError from '../../../shared/erros/AppError';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError('email ou senha não conferem', 401);
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('email ou senha não conferem', 401);
    }
    const { secret, expiresIn } = Auth.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
