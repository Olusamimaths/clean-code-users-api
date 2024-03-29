import { User } from '../entities';

export abstract class IReqresService {
  abstract get(id: number): Promise<User>;
  abstract getAvatarUrl(id: string): Promise<string>;
}
