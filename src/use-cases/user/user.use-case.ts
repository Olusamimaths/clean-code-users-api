import { IDataService, IReqresService } from '@/core/abstracts';
import { CreateUserDto } from '@/core/dtos';
import { User } from '@/core/entities';
import { Injectable } from '@nestjs/common';
import { UserFactoryService } from './user-factory.service';
import { AvatarFactoryService } from '../avatar';
import { FileStorage } from '@/lib/file-storage';
import { GetAvatarResponse } from '@/core/dtos/responses';

@Injectable()
export class UserUseCase {
  constructor(
    private readonly dataServices: IDataService,
    private readonly userFactoryService: UserFactoryService,
    private readonly avatarFactoryService: AvatarFactoryService,
    private readonly reqresService: IReqresService,
    private readonly fileService: FileStorage,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userFactoryService.createNewUser(createUserDto);
    return this.dataServices.users.create(user);
  }

  async getUser(userId: number): Promise<User> {
    return this.reqresService.get(userId);
  }

  async getUserBase64Avatar(userId: string): Promise<GetAvatarResponse> {
    const existingAvatar = await this.dataServices.avatars.get(`${userId}`);
    if (existingAvatar) {
      const base64File = await this.fileService.getFileBase64(
        existingAvatar.hash,
      );
      return GetAvatarResponse.from(base64File);
    }

    const avatarUrl = await this.reqresService.getAvatarUrl(userId);
    const { hash, base64File } = await this.fileService.saveFile(avatarUrl);

    const avatar = this.avatarFactoryService.createNewAvatar({
      userId: `${userId}`,
      hash,
    });
    await this.dataServices.avatars.create(avatar);
    return GetAvatarResponse.from(base64File);
  }
}
