export interface IWriterRepository<T> {
  create(entity: T): Promise<T>;
  update(id: string, entity: T): Promise<T>;
  delete(id: string): Promise<T>;
  deleteOne(query: any): Promise<T>;
}

export interface IReaderRepository<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T>;
  getOne(query: any): Promise<T>;
}

export interface IGenericRepository<T>
  extends IWriterRepository<T>,
    IReaderRepository<T> {}
