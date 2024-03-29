import { IDataService } from '@/core/abstracts';
import { CreateUserDto } from '@/core/dtos';
import { User } from '@/core/entities';
import { Injectable } from '@nestjs/common';
import { UserFactoryService } from './user-factory.service';

@Injectable()
export class UserUseCase {
  constructor(
    private readonly dataServices: IDataService,
    private readonly userFactoryService: UserFactoryService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userFactoryService.createNewUser(createUserDto);
    return this.dataServices.users.create(user);
  }
}
