import { binding, then, when, before } from 'cucumber-tsflow';
import { assert } from 'chai';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';

class Context {
  public app;
  public response;
}

@binding([Context])
export class HealthSteps {
  constructor(protected context: Context) {}

  @before()
  public async before() {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.context.app = moduleFixture.createNestApplication();
    await this.context.app.init();
  }
}
