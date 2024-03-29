import { IDataService, IGenericRepository } from '@/core/abstracts';
import { User } from '@/core/entities';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MongoBaseRepository } from './mongo-base-repository';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel, UserSchema } from './model';
import { Model } from 'mongoose';

@Injectable()
export class MongoDataServicesService
  implements IDataService, OnApplicationBootstrap
{
  users: IGenericRepository<UserModel>;

  constructor(
    @InjectModel(UserModel.name) private userRepository: Model<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoBaseRepository<UserModel>(this.userRepository);
  }
}
