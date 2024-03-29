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
  public createUserResponseContains(table: any) {
    const resultObj = table.rowsHash();
    const expectedFirstname = resultObj.firstName;
    assert.equal(this.context.response.body.firstName, expectedFirstname);
    assert.equal(this.context.response.body.lastName, resultObj.lastName);
    assert.equal(this.context.response.body.email, resultObj.email);
    assert.exists(this.context.response.body.id);
    assert.isString(this.context.response.body.id);
  }

  @when(/I make get request to get user with id "([^"]*)"/)
  public async callToGetUserEndpoint(userId: string) {
    const endpoint = `/api/user/${userId}`;
    this.context.response = await request(this.context.app.getHttpServer()).get(
      `${endpoint}`,
    );
  }

  @then(/the get user response status code should be (\d+)/)
  public assertGetUserById(statusCode: number) {
    assert.equal(this.context.response.status, statusCode);
  }

  @then(/the get user response should contain:/)
  public getUserByIdResponse(table: any) {
    const resultObj = table.rowsHash();
    const expectedId = resultObj.id;
    assert.equal(this.context.response.body.id, expectedId);
    assert.exists(this.context.response.body.firstName);
    assert.exists(this.context.response.body.lastName);
    assert.exists(this.context.response.body.avatar);
    assert.exists(this.context.response.body.email);
  }

  @when(/I make get request to get avatar of user with id "([^"]*)"/)
  public async callToGetUserAvatarEndpoint(userId: string) {
    const endpoint = `/api/user/${userId}/avatar`;
    this.context.response = await request(this.context.app.getHttpServer()).get(
      `${endpoint}`,
    );
  }

  @then(/the get avatar response status code should be (\d+)/)
  public assertGetUserAvatarById(statusCode: number) {
    assert.equal(this.context.response.status, statusCode);
  }

  @then(/the get avatar response should contain:/)
  public getUserAvatarByIdResponse(table: any) {
    assert.exists(this.context.response.body.avatar);
    assert.isString(this.context.response.body.avatar);
    assert.isNotEmpty(this.context.response.body.avatar);
  }

  @when(/I make a delete request the avatar of user with id "([^"]*)"/)
  public async callToDeleteAvatarAvatarEndpoint(userId: string) {
    const endpoint = `/api/user/${userId}/avatar`;
    this.context.response = await request(
      this.context.app.getHttpServer(),
    ).delete(`${endpoint}`);
  }

  @then(/the avatar deletion response status code should be (\d+)/)
  public assertDeleteAvatarAvatarById(statusCode: number) {
    assert.equal(this.context.response.status, statusCode);
  }

  @then(/the delete avatar response should contain:/)
  public deleteUserAvatarByIdResponse(table: any) {
    assert.exists(this.context.response.body.deleted);
    assert.equal(this.context.response.body.deleted, true);
  }
}
