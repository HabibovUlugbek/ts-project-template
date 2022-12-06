import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { UserResponse } from "../../db/models/user/exceptions";
import { User, UserModel } from "../../db/models/user/user.model";
import { CommonServices } from "../common.service";

class UserService extends CommonServices<User> {
  constructor(model: ModelType<User>) {
    super(model);
  }

  public async findByIdError(id) {
    try {
      let user = await this.model.findById(id);
      if (!user) throw UserResponse.NotFound(id);
      return user;
    } catch (error) {
      throw UserResponse.NotFound();
    }
  }

  public async findByUserName(
    username: string,
    projection = {
      isDeleted: 0,
      __v: 0,
    }
  ) {
    try {
      let user = await this.model.find({ username: username }, projection);
      if (!user) throw UserResponse.NotFound(username);
      return user[0];
    } catch (error) {
      return error;
    }
  }

  public async getUserById<T>(id: string, isDeleted: boolean = false) {
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

      const $projection = {
        $project: {
          _id: 1,
          fullName: 1,
          username: 1,
          biography: 1,
          avatar: 1,
        },
      };

      const $pipline = [$match, $projection];

      const data = await this.model.aggregate($pipline);
      if (!data || !data[0]) throw UserResponse.NotFound(id);
      return data[0];
    } catch (error) {
      return error;
    }
  }
}

export const userService = new UserService(UserModel);
