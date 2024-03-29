import { User } from '@/core/entities';

export class GetUserResponse {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;

  public static from(user: User): GetUserResponse {
    const response = new GetUserResponse();
    response.id = user.id;
    response.fullName = `${user.firstName} ${user.lastName}`;
    response.firstName = user.firstName;
    response.lastName = user.lastName;
    response.email = user.email;
    response.avatar = user.avatar;

    return response;
  }
}
