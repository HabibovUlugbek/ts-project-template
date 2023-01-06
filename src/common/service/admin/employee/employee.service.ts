import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { CollectionNames } from "../../../constants/collections";
import { EmployeeResponse } from "../../../db/models/admin/employee/exception";
import {
  Employee,
  EmployeeModel,
} from "../../../db/models/admin/employee/models";
import { EmployeeDto, EmployeeGetDto } from "../../../validation/dto/admin/employee/employee.dto";
import { CommonServices } from "../../common.service";

class EmployeeService extends CommonServices<Employee> {
  constructor(model: ModelType<Employee>) {
    super(model);
  }
  
  public async findByIdError(id) {
    try {
      let admin = await this.model.findById(id);
      if (!admin) throw EmployeeResponse.NotFound(id);
      return admin;
    } catch (error) {
      return error
    }
  }
  
  public async findByUserName(userName: string) {
    try {
      let employee = await this.find({ userName: userName });
      if (!employee) throw EmployeeResponse.NotFound(userName);
      return employee[0];
    } catch (error) {
      return error 
    }
  }
  
  public async getPaging<T>(dto: EmployeeGetDto) {
    try {
      let query: any = { isDeleted: false };
      
      const $lookupRole = {
        $lookup: {
          from: CollectionNames.ROLE,
          foreignField: "_id",
          localField: "roleId",
          as: "role",
        },
      };
      
      const $unwindRole = {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: true,
        },
      };
      
      const $projection = {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          userName: 1,
          isActive: 1,
          role: {
            _id: 1,
            name: 1,
          },
        },
      };
      
      const $pipline = [$lookupRole, $unwindRole, $projection];
      
      return await this.findPaging(query, dto, $pipline);
    } catch (error) {
      throw (error);
    }
  }
  
  public async getEmployeeById<T>(id: string, isDeleted: boolean = false) {
    try {
      const $match: any = {
        $match: {
          _id: new Types.ObjectId(id),
          isDeleted: false,
        },
      };
      
      if (isDeleted) {
        delete $match.$match.isDeleted;
      }
      
      const $lookupRole = {
        $lookup: {
          from: CollectionNames.ROLE,
          foreignField: "_id",
          localField: "roleId",
          as: "role",
        },
      };
      
      const $unwindRole = {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: true,
        },
      };
      
      const $projection = {
        $project: {
          _id: 1,
          isActive: 1,
          lastName: 1,
          firstName: 1,
          userName: 1,
          role: {
            _id: 1,
            name: 1,
          },
        },
      };
      
      const $pipline = [$match, $lookupRole, $unwindRole, $projection];
      
      const data = await this.aggregate($pipline);
      if (!data || !data[0]) throw EmployeeResponse.NotFound(id);
      return data[0];
    } catch (error) {
      throw error;
    }
  }

  public async create(data: EmployeeDto) {
    try {
        return await super.create(data)
    } catch (e) { 
        if (e.code == 11000) throw EmployeeResponse.AllreadyExist(Object.keys(e.keyPattern))
        throw e
    }
}
public async update(id, data: EmployeeDto, options?: QueryOptions) {
    try {
        return await super.updateOne(id, data, options)
    } catch (e) {
        if (e.code == 11000) throw EmployeeResponse.AllreadyExist(Object.keys(e.keyPattern))
        throw e
    }
}
}

export const employeeService = new EmployeeService(EmployeeModel);
