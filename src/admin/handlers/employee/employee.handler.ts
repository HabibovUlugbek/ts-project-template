import { employeeService } from "./../../../common/service/admin/employee/employee.service";
import { roleService } from "./../../../common/service/admin/role/role.service";
import sha256 from "sha256";
import { Roles } from "../../../common/constants/roles";
import { EmployeeResponse } from "../../../common/db/models/admin/employee/exception";
import { RoleResponse } from "../../../common/db/models/admin/role/exception";
import { jwt } from "../../../common/utils/jwt";
import {
  EmployeeDto,
  EmployeeDtoGroups,
  EmployeeGetDto,
} from "../../../common/validation/dto/admin/employee/employee.dto";
import { BaseDto, DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";

export async function getEmployeePagingHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    await roleService.hasAccess(request.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.query, EmployeeGetDto, [
      EmployeeDtoGroups.PAGENATION,
    ]);

    const employees = await employeeService.getPaging(data);

    return response.send(EmployeeResponse.Success(employees));
  } catch (error) {
    return next(error);
  }
}

export async function getEmployeeByIdHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    await roleService.hasAccess(request.roleId, Roles.EMPLOYEE);

    let valid = await validateIt(request.params, BaseDto, DtoGroups.GET_BY_ID);

    const employee = await employeeService.getEmployeeById(valid._id);

    return response.send(EmployeeResponse.Success(employee));
  } catch (error) {
    return next(error);
  }
}

export async function createEmployeeHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    await roleService.hasAccess(request.roleId, Roles.EMPLOYEE_CREATE);

    const data = await validateIt(
      request.body,
      EmployeeDto,
      EmployeeDtoGroups.CREATE
    );

    let role = await roleService.findById(data.roleId);

    if (!role) throw RoleResponse.NotFound();

    data.password = sha256(data.password);

    const employee = await employeeService.create(data);

    return response.send(EmployeeResponse.Success(employee._id));
  } catch (error) {
    return next(error);
  }
}

export async function updateEmployeeHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    await roleService.hasAccess(request.roleId, Roles.EMPLOYEE_UPDATE);

    const data = await validateIt(request.body, EmployeeDto, [
      EmployeeDtoGroups.UPDATE,
    ]);

    if (data.password) {
      data.password = sha256(data.password);
    }

    let employee = await employeeService.findById(data._id);
    if (!employee._id) throw EmployeeResponse.NotFound();

    const updatedEmployee = await employeeService.update(data._id, data);

    return response.send(EmployeeResponse.Success(updatedEmployee._id));
  } catch (error) {
    return next(error);
  }
}

export async function deleteEmployeeHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    await roleService.hasAccess(request.roleId, Roles.EMPLOYEE_DELETE);

    let valid = await validateIt(request.params, BaseDto, DtoGroups.GET_BY_ID);

    const employee = await employeeService.getEmployeeById(valid._id);

    const deleteEmployee = await employeeService.updateOne(employee._id, {
      isDeleted: true,
    });

    return response.send(EmployeeResponse.Success(deleteEmployee._id));
  } catch (error) {
    return next(error);
  }
}

export async function signInHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    const data = await validateIt(request.body, EmployeeDto, [
      EmployeeDtoGroups.LOGIN,
    ]);

    const employee = await employeeService.findByUserName(data.username);

    if (sha256(data.password) != employee.password)
      throw EmployeeResponse.InvalidPassword();

    const token = await jwt.sign({ userId: employee._id });

    return response.send({
      token,
      employee: {
        _id: employee._id,
        firstName: employee.firstname,
        lastName: employee.lastname,
        userName: employee.username,
      },
    });
  } catch (error) {
    return next(error);
  }
}
