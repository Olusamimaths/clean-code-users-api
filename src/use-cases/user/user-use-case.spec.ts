import { Test, TestingModule } from '@nestjs/testing';
import { UserUseCase } from './user.use-case';

describe('UserUseCase', () => {
  let service: UserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUseCase],
    }).compile();

    service = module.get<UserUseCase>(UserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
