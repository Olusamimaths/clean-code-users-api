import { IDataService } from '@/core/abstracts';
import { User } from '@/core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserUseCase {
  constructor(private readonly dataServices: IDataService) {}

  async createUser(user: User): Promise<User> {
    return this.dataServices.users.create(user);
  }
}
