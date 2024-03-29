import { CreateUserDto } from '@/core/dtos';
import {
  GetUserResponse,
  GetAvatarResponse,
  DeleteAvatarResponse,
} from '@/core/dtos/responses';
import { UserUseCase } from '@/use-cases/user/user.use-case';
import {
  Body,
  Controller,
  Delete,
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

  @Get('api/user/:userId')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('userId') userId: string): Promise<GetUserResponse> {
    const user = await this.userUseCase.getUser(userId);
    return GetUserResponse.from(user);
  }

  @Get('api/user/:userId/avatar')
  @HttpCode(HttpStatus.OK)
  async getUserAvatar(
    @Param('userId') userId: string,
  ): Promise<GetAvatarResponse> {
    const user = await this.userUseCase.getUserBase64Avatar(userId);
    return GetAvatarResponse.from(user);
  }

  @Delete('api/user/:userId/avatar')
  @HttpCode(HttpStatus.OK)
  async deletUserAvatar(
    @Param('userId') userId: string,
  ): Promise<DeleteAvatarResponse> {
    const deleted = await this.userUseCase.deleteUserAvatar(userId);
    return DeleteAvatarResponse.from(deleted);
  }
}
