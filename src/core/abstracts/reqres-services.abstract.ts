import { User } from '../entities';

export abstract class IReqresService {
  abstract get(id: string): Promise<User>;
  abstract getAvatarUrl(id: string): Promise<string>;
}
