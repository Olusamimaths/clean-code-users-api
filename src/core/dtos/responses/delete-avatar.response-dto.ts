export class DeleteAvatarResponse {
  deleted: boolean;

  public static from(deleted: boolean): DeleteAvatarResponse {
    const response = new DeleteAvatarResponse();
    response.deleted = deleted;

    return response;
  }
}
