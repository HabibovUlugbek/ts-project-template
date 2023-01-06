import { employeeService } from "./../../common/service/admin/employee/employee.service";
import { jwt } from "../../common/utils/jwt";

export async function authToken(request: any, response: any, next: Function) {
  try {
    const { userId } = jwt.verify(request.headers.token);

    const employee = await employeeService.findByIdError(userId);

    request.roleId = employee.roleId;

    return next();
  } catch (error) {
    return next(error);
  }
}
