import { CreateUserDto } from '@/core/dtos';
import { CreateUserResponse } from '@/core/dtos/responses';
import { UserUseCase } from '@/use-cases/user/user.use-case';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('api/users')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() userDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    const user = await this.userUseCase.createUser(userDto);
    return CreateUserResponse.from(user);
  }
}
