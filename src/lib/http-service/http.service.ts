import { BadRequestException, Injectable } from '@nestjs/common';
import fetch, { RequestInit, Response } from 'node-fetch';
import { IHttpResponse, IHttpService } from './types';

@Injectable()
export class HttpService implements IHttpService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  public async post<T = any>(
    url: string,
    body: Record<string, string | any>,
    headers?: Record<string, string>,
  ): Promise<IHttpResponse<T>> {
    try {
      const options: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      };

      const response: Response = await fetch(url, options);
      const data: any = await response.json();

      return {
        status: response.status,
        data: data?.data as T,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  public async get<T = any>(
    url: string,
    headers?: Record<string, string>,
  ): Promise<IHttpResponse<T>> {
    try {
      const options: RequestInit = {
        method: 'GET',
        headers,
      };

      const response: Response = await fetch(url, options);
      const data: any = await response.json();

      return {
        status: response.status,
        data: data?.data as T,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  public async delete(
    url: string,
    headers?: Record<string, string>,
  ): Promise<IHttpResponse> {
    try {
      const options: RequestInit = {
        method: 'DELETE',
        headers,
      };

      const response: Response = await fetch(url, options);

      return {
        status: response.status,
        data: null,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
