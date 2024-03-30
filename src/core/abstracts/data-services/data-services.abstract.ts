import { Avatar, User } from '@core/entities';
import { IGenericRepository } from '../repository/base-repository.abstract';

export abstract class IDataService {
  abstract users: IGenericRepository<User>;
  abstract avatars: IGenericRepository<Avatar>;
}
