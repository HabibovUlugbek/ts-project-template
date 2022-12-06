import sha256 from "sha256";
import { UserResponse } from "../../../common/db/models/user/exceptions";
import { validateIt } from "../../../common/validation/validate";
import { jwt } from "../../../common/utils/jwt";

import { userService } from "../../../common/service/user/user.service";
import cloudinary from "../../../common/config";

import {
  UserDto,
  UserDtoGroups,
} from "../../../common/validation/dto/user/user.dto";

export async function createUserHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    let data = request.body;

    data = await validateIt(data, UserDto, [UserDtoGroups.REGISTER]);

    data.password = sha256(data.password);

    let $projection = {
      password: 0,
      isDeleted: 0,
      __v: 0,
    };

    let user = await userService.create(data, $projection);

    const token = await jwt.sign({ userId: user._id });

    return response.send(
      UserResponse.Success({
        token,
        user,
      })
    );
  } catch (error) {
    return next(error);
  }
}

export async function loginUserHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    let data: { username: string; password: string } = await validateIt(
      request.body,
      UserDto,
      [UserDtoGroups.LOGIN]
    );
    let $projection = {
      isDeleted: 0,
      __v: 0,
    };
    const user = await userService.findByUserName(data.username, $projection);

    if (sha256(data.password) != user.password) {
      throw UserResponse.InvalidPassword();
    }

    const token = await jwt.sign({ userId: user._id });

    return response.send({
      token,
      user,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getMyselfHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    const user = await userService.getUserById(request.user.userId);
    return response.send(UserResponse.Success(user));
  } catch (error) {
    return next(error);
  }
}

export async function getUserHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    const user = await userService.getUserById(request.params.userId);
    return response.send(UserResponse.Success(user));
  } catch (error) {
    return next(error);
  }
}

export async function updateUserHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    let data = request.body;

    data._id = request.user.userId;
    data = await validateIt(data, UserDto, [UserDtoGroups.UPDATE]);

    let user = await userService.findByIdError(data._id);

    if (data.password) {
      data.password = sha256(data.password);
    }

    user = await userService.updateOne(user._id, data);

    return response.send(UserResponse.Success(user._id));
  } catch (error) {
    return next(error);
  }
}

export async function userImageUploaderHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    const fileStr = request.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr);

    let _id = request.user.userId;

    let user = await userService.findByIdError(_id);

    user.avatar = {
      url: uploadedResponse.url,
      publicId: uploadedResponse.public_id,
    };

    user = await userService.updateOne(user._id, user);

    return response.send(UserResponse.Success(user));
  } catch (error) {
    return next(error);
  }
}

export async function deleteUserHandler(
  request: any,
  response: any,
  next: Function
) {
  try {
    let user = await userService.findByIdError(request.body.userId);

    user = await userService.updateOne(user._id, { isDeleted: true });

    return response.send(UserResponse.Success(user._id));
  } catch (error) {
    return next(error);
  }
}
