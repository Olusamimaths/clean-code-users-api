export abstract class IGenericRepository<T> {
  public abstract create(entity: T): Promise<T>;
  public abstract update(id: number, entity: T): Promise<T>;
  public abstract delete(id: number): Promise<T>;
  public abstract getAll(): Promise<T[]>;
  public abstract get(id: number): Promise<T>;
}
