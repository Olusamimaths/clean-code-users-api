import { CreateUserDto } from '@/core/dtos';
import { GetUserResponse, GetAvatarResponse } from '@/core/dtos/responses';
import { UserUseCase } from '@/use-cases/user/user.use-case';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post('api/users')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: CreateUserDto): Promise<GetUserResponse> {
    const user = await this.userUseCase.createUser(userDto);
    return GetUserResponse.from(user);
  }

  @Get('api/user/:userId/avatar')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('userId') userId: string): Promise<GetAvatarResponse> {
    return this.userUseCase.getUser(userId);
  }
}
