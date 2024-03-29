import { binding, then, when, before } from 'cucumber-tsflow';
import { assert } from 'chai';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';

class Context {
  public app: INestApplication<any>;
  public response: Record<string, any>;

  /**
   * Converts a Gherkin table to an object.
   * @param table - The table to convert.
   * @returns The converted object.
   */
  public tableToObject(table: any): Record<string, any> {
    return table.rawTable.reduce(
      (result: Record<string, any>, current: any[]) => {
        result[current[0] as string] = JSON.parse(current[1]);
        return result;
      },
      {},
    );
  }

  /**
   * Converts a Gherkin table object to an array of values.
   * @param table - The table object to convert.
   * @returns An array of values extracted from the table.
   */
  public tableToArray(table: any): any[] {
    return table.rawTable.map((item: any[]) => item[0]);
  }
}

@binding([Context])
export class UserSteps {
  constructor(protected context: Context) {}

  @before()
  public async before() {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.context.app = moduleFixture.createNestApplication();
    await this.context.app.init();
  }

  @when(/I make post request to "([^"]*)" with/)
  public async callToHealthEndpoint(endpoint: string, body) {
    const requestBody = this.context.tableToObject(body);
    this.context.response = await request(this.context.app.getHttpServer())
      .post(endpoint)
      .send(requestBody);
  }

  @then(/the user creation response status code should be (\d+)/)
  public assertCreateUserStatus(statusCode: number) {
    assert.equal(this.context.response.status, statusCode);
  }

  @then(/the user creation response should contain:/)
  public GetUserResponseContainsStatus(table: any) {
    const resultObj = table.rowsHash();
    const expectedFirstname = resultObj.firstName;
    assert.equal(this.context.response.body.firstName, expectedFirstname);
    assert.equal(this.context.response.body.lastName, resultObj.lastName);
    assert.equal(this.context.response.body.email, resultObj.email);
    assert.exists(this.context.response.body.id);
    assert.isString(this.context.response.body.id);
  }
}
