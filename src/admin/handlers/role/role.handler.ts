import { roleService } from "./../../../common/service/admin/role/role.service";
import { Roles } from "../../../common/constants/roles";
import { RoleResponse } from "../../../common/db/models/admin/role/exception";
import {
  RoleDto,
  RoleDtoGroup,
  RoleGetDto,
} from "../../../common/validation/dto/admin/role/role.dto";
import { BaseDto, DtoGroups } from "../../../common/validation/dtoGroups.dto";
import { validateIt } from "../../../common/validation/validate";

export async function getRolePagingHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    await roleService.hasAccess(request.roleId.toString(), Roles.ROLE);

    const data = await validateIt(request.query, RoleGetDto, [
      RoleDtoGroup.PAGENATION,
    ]);
    const role = await roleService.getPaging(data);

    return response.send(RoleResponse.Success(role));
  } catch (error) {
    return next(error);
  }
}

export async function getRoleByIdHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    await roleService.hasAccess(request.roleId, Roles.ROLE);

    let valid = await validateIt(request.params, BaseDto, DtoGroups.GET_BY_ID);

    const roleById = await roleService.findByIdError(valid._id);

    return response.send(RoleResponse.Success(roleById));
  } catch (error) {
    return next(error);
  }
}

export async function createRoleHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    await roleService.hasAccess(request.roleId.toString(), Roles.ROLE_CREATE);

    const data = await validateIt(request.body, RoleDto, [RoleDtoGroup.CREATE]);

    const role = await roleService.create(data);

    return response.send(RoleResponse.Success(role._id));
  } catch (error) {
    return next(error);
  }
}

export async function updateRoleHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    await roleService.hasAccess(request.roleId, Roles.ROLE_UPDATE);

    const data = await validateIt(request.body, RoleDto, [RoleDtoGroup.UPDATE]);

    if (request.roleId == data._id) throw RoleResponse.NotEnoughPermission();

    const changeRole = await roleService.update(data._id, data);

    return response.send(RoleResponse.Success(changeRole));
  } catch (error) {
    return next(error);
  }
}

export async function deleteRoleHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    await roleService.hasAccess(request.roleId, Roles.ROLE_DELETE);

    let valid = await validateIt(request.params, BaseDto, DtoGroups.GET_BY_ID);

    const role = await roleService.findByIdError(valid._id);

    const deleteRole = await roleService.deleteOne(role._id);

    return response.send(RoleResponse.Success(deleteRole._id));
  } catch (error) {
    return next(error);
  }
}
