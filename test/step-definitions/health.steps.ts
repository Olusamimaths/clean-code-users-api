import { binding, then, when, before } from 'cucumber-tsflow';
import { assert } from 'chai';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';

class Context {
  public app: INestApplication<any>;
  public response: Record<string, any>;
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

  @when(/I make a GET request to "([^"]*)"/)
  public async callToHealthEndpoint(endpoint: string) {
    this.context.response = await request(this.context.app.getHttpServer()).get(
      endpoint,
    );
  }

  @then(/the health response status code should be (\d+)/)
  public assertStatusCode(statusCode: number) {
    assert.equal(this.context.response.status, statusCode);
  }

  @then(/the health response should contain:/)
  public responseContainsStatus(table: any) {
    const expectedStatus = table.rowsHash().status;
    assert.equal(this.context.response.body.status, expectedStatus);
  }
}
