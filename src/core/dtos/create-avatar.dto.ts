import { Type } from 'class-transformer';

export class CreateAvatarDto {
  @Type(() => String)
  userId: string;

  hash: string;
}
