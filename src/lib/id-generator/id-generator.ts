import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IIdGenerator } from './id-generator.interface';

@Injectable()
export class IdGenerator implements IIdGenerator {
  public newId(): string {
    return uuidv4();
  }
}
