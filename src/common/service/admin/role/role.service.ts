import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions } from "mongoose";
import { EmployeeResponse } from "../../../db/models/admin/employee/exception";
import { RoleResponse } from "../../../db/models/admin/role/exception";
import { Role, RoleModel } from "../../../db/models/admin/role/models";
import { RoleDto, RoleGetDto } from "../../../validation/dto/admin/role/role.dto";
import { CommonServices } from "../../common.service";

class RoleService extends CommonServices<Role> {
  constructor(model: ModelType<Role>) {
    super(model);
  }
  public async findByIdError(id) {
    try {
      const role = await this.findById(id);
      if (!role) throw RoleResponse.NotFound(id);
      return role;
    } catch (error) {
      return error
    }
  }
  
  public async hasAccess(id: string, access: string) {
    try {
      const role = await this.findById(id);
      if (!role[access] || role.isDeleted) throw EmployeeResponse.NotEnoughPermission();
    } catch (error) {
      console.log(99, error.message);
      
      return error
    }
  }
  
  public async getPaging<T>(dto: RoleGetDto) {
    let query = {
      isDeleted: false,
    };
    
    const $projection = {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
      },
    };
    
    const $pipline = [$projection];
    
    return await this.findPaging(query, dto, $pipline);
  }
  
  public async create(data: RoleDto) {
    try {
      return await super.create(data)
    } catch (e) {
      if (e.code == 11000) throw RoleResponse.AlreadyExists(Object.keys(e.keyPattern))
      throw e
    }
  }
  public async update(id, data: RoleDto, options?: QueryOptions) {
    try {
      return await super.updateOne(id, data, options)
    } catch (e) {
      if (e.code == 11000) throw RoleResponse.AlreadyExists(Object.keys(e.keyPattern))
      throw e
    }
  }
  
}

export const roleService = new RoleService(RoleModel);
