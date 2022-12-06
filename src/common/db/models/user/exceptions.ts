import { BaseResponse } from "../../../report/base.response";
import { ErrorCodes } from "../../../constants/error.codes";

export class UserResponse extends BaseResponse {
  static Success(data: any = null) {
    return new UserResponse(ErrorCodes.USER, "Success", data);
  }

  static AlreadyExist(data: any = null) {
    return new UserResponse(ErrorCodes.USER, "User exist", data);
  }
  static NotFound(data: any = null) {
    return new UserResponse(ErrorCodes.USER + 1, "User not found", data);
  }

  static InvalidPassword() {
    return new UserResponse(ErrorCodes.USER + 2, "Password is invalid", null);
  }

  static TokenNotFound(data: any = null) {
    return new UserResponse(ErrorCodes.USER + 3, "Token not found", data);
  }

  static InvalidToken(data: any = null) {
    return new UserResponse(ErrorCodes.USER + 4, "Invalid Token!", data);
  }
}
