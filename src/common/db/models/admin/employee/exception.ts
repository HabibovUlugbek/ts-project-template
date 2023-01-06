import { ErrorCodes } from "../../../../constants/error.codes";
import { BaseResponse } from "../../../../report/base.response";

export class EmployeeResponse extends BaseResponse {
  static AllreadyExist(data: any = null) {
    return new BaseResponse(ErrorCodes.EMPLOYEE, "Employee exist!", data);
  }

  static NotFound(data: any = null) {
    return new BaseResponse(
      ErrorCodes.EMPLOYEE + 1,
      "Employee not found!",
      data
    );
  }

  static NotEnoughPermission(data: any = null) {
    return new BaseResponse(
      ErrorCodes.EMPLOYEE + 2,
      "Not enough permissions to access!",
      data
    );
  }

  static InvalidPassword(data: any = null) {
    return new BaseResponse(ErrorCodes.EMPLOYEE + 3, "Invalid password!", data);
  }
}
