import User from '../infra/typeorm/entities/User';
import IcreateUsersDTO from '../dtos/IcreateUsersDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IcreateUsersDTO): Promise<User>;
  save(user: User): Promise<User>;
}
