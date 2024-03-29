export class GetAvatarResponse {
  base64: string;

  public static from(base64: string): GetAvatarResponse {
    const response = new GetAvatarResponse();
    response.base64 = base64;

    return response;
  }
}
