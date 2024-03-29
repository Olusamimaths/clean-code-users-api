import { CreateUserDto } from '@/core/dtos';
import { User } from '@/core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto): User {
    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.avatar = createUserDto.avatar;

    return newUser;
  }
}
