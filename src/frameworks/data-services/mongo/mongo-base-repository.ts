import { Model } from 'mongoose';
import { IGenericRepository } from '@/core/abstracts';
import { IdGenerator } from '@/lib';

export class MongoBaseRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  get(id: string): Promise<T> {
    return this._repository
      .findById(id)
      .populate(this._populateOnFind)
      .exec() as Promise<T>;
  }

  getOne(query: any): Promise<T> {
    return this._repository
      .findOne(query)
      .populate(this._populateOnFind)
      .exec() as Promise<T>;
  }

  create(item: T): Promise<T> {
    const _id = new IdGenerator().newId();
    return this._repository.create({ _id, ...item });
  }

  update(id: string, item: T) {
    return this._repository.findByIdAndUpdate(id, item);
  }

  delete(id: string) {
    return this._repository.findByIdAndDelete(id);
  }

  deleteOne(query: any) {
    return this._repository.findOneAndDelete(query);
  }
}
