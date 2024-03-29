export class GetAvatarResponse {
  avatar: string;

  public static from(base64: string): GetAvatarResponse {
    const response = new GetAvatarResponse();
    response.avatar = base64;

    return response;
  }
}
