import { Model } from 'mongoose';
import { IGenericRepository } from '@/core/abstracts';

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

  get(id: number): Promise<T> {
    return this._repository
      .findById(id)
      .populate(this._populateOnFind)
      .exec() as Promise<T>;
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: number, item: T) {
    return this._repository.findByIdAndUpdate(id, item);
  }

  delete(id: number) {
    return this._repository.findByIdAndDelete(id);
  }
}
