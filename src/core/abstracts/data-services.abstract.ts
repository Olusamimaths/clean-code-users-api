import { User } from '@core/entities';
import { IGenericRepository } from './base-repository.abstract';

export abstract class IDataService {
  abstract users: IGenericRepository<User>;
}
