import { CreateAvatarDto } from '@/core/dtos';
import { Avatar } from '@/core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AvatarFactoryService {
  createNewAvatar(createAvatarDto: CreateAvatarDto): Avatar {
    const newAvatar = new Avatar();
    newAvatar.userId = createAvatarDto.userId;
    newAvatar.hash = createAvatarDto.hash;
    return newAvatar;
  }
}
