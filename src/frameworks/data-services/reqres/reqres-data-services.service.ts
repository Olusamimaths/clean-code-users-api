import { IReqresService } from '@/core/abstracts';
import { HttpService } from '@/lib';
import { User } from '@/core/entities';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, Injectable } from '@nestjs/common';
import { IHttpResponse } from '@/lib/http-service/types';

@Injectable()
export class ReqresService implements IReqresService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async get(id: string): Promise<User> {
    const reqresUrl = this.configService.get<string>('reqres.url');
    const response = await this.httpService.get<User>(
      `${reqresUrl}/users/${id}`,
    );
    if (response.status !== HttpStatus.OK) throw new Error('User not found');
    const user = this._createEntityFromResponse(response);
    return user;
  }

  private _createEntityFromResponse(response: IHttpResponse<User>) {
    const user = new User();
    user.id = response.data.id;
    user.email = response.data.email;
    user.firstName = response.data.first_name;
    user.lastName = response.data.last_name;
    user.avatar = response.data.avatar;
    return user;
  }

  async getAvatarUrl(id: string): Promise<string> {
    const reqresUrl = this.configService.get<string>('reqres.url');
    const response = await this.httpService.get<User>(
      `${reqresUrl}/users/${id}`,
    );
    if (response.status !== HttpStatus.OK) throw new Error('User not found');
    const { avatar } = response.data;
    return avatar;
  }
}
