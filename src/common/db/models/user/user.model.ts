import { getModelForClass, index, prop } from "@typegoose/typegoose";
import { BaseModel } from "../base.model";

// @index(
//   {
//     isDeleted: 1,
//     isActive: 1,
//   },
//   {
//     background: true,
//     name: "isActive",
//   }
// )

export class Avatar {
  @prop({ trim: true })
  url: string;

  @prop({ trim: true })
  publicId: string;
}

export class User extends BaseModel {
  @prop({
    trim: true,
    unique: true,
    required: true,
  })
  username: string;

  @prop({ trim: true, required: true })
  password: string;

  @prop({ trim: true })
  fullName?: string;

  @prop({
    type: () => Avatar,
  })
  avatar?: Avatar;

  @prop({ trim: true })
  email?: string;

  @prop({ trim: true })
  biography?: string;
}

export const UserModel = getModelForClass(User);
