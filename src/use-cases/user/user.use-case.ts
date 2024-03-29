import { IDataService, IReqresService } from '@/core/abstracts';
import { CreateUserDto } from '@/core/dtos';
import { User } from '@/core/entities';
import { Injectable } from '@nestjs/common';
import { UserFactoryService } from './user-factory.service';
import { AvatarFactoryService } from '../avatar';
import { FileStorage } from '@/lib/file-storage';

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

  async getUser(userId: string): Promise<User> {
    return this.reqresService.get(userId);
  }

  async getUserBase64Avatar(userId: string): Promise<string> {
    const existingAvatar = await this.dataServices.avatars.getOne({ userId });
    if (existingAvatar) {
      console.log('Avatar already exists..');
      return await this.fileService.getFileBase64(existingAvatar.hash);
    }

    const avatarUrl = await this.reqresService.getAvatarUrl(userId);
    const { hash, base64File } = await this.fileService.saveFile(avatarUrl);

    const avatar = this.avatarFactoryService.createNewAvatar({
      userId,
      hash,
    });
    await this.dataServices.avatars.create(avatar);
    return base64File;
  }

  async deleteUserAvatar(userId: string): Promise<boolean> {
    try {
      const result = await this.dataServices.avatars.getOne({ userId });
      if (!result) return true;
      await this.dataServices.avatars.deleteOne({ userId });
      await this.fileService.deleteFile(result.hash);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
