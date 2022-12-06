import { ErrorCodes } from "../constants/error.codes";

export class BaseResponse {
  constructor(
    public code: number,
    public message: string,
    public data: any,
    public success: boolean = false,
    public statusCode: number = 400,
    public time = new Date()
  ) {}
  public static UnknownError(data?: any) {
    return new BaseResponse(ErrorCodes.BASE, "Unknown error!", data);
  }
  public static ValidationError(data?: any) {
    return new BaseResponse(ErrorCodes.BASE + 1, "Validation Error!", data);
  }

  public static Success(data: any = null) {
    return new BaseResponse(0, "OK", data, true, 200);
  }

  public static UnAuthorizationError(data: any = null) {
    return new BaseResponse(401, "Session expired!", data, false, 401);
  }
}
