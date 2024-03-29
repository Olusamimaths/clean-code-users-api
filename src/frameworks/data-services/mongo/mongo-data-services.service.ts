import { IDataService, IGenericRepository } from '@/core/abstracts';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MongoBaseRepository } from './mongo-base-repository';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from './model';
import { Model } from 'mongoose';
import { AvatarDocument, AvatarModel } from './model/avatar-model';

@Injectable()
export class MongoDataServicesService
  implements IDataService, OnApplicationBootstrap
{
  users: IGenericRepository<UserModel>;
  avatars: IGenericRepository<AvatarModel>;

  constructor(
    @InjectModel(UserModel.name) private userRepository: Model<UserDocument>,
    @InjectModel(AvatarModel.name)
    private avatarRepository: Model<AvatarDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoBaseRepository<UserModel>(this.userRepository);
    this.avatars = new MongoBaseRepository<AvatarModel>(this.avatarRepository);
  }
}
