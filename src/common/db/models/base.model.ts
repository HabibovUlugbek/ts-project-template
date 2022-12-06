import { modelOptions, prop, index, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "./user/user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@index(
  {
    isDeleted: 1,
  },
  {
    background: true,
    name: "isDeleted",
  }
)
export class BaseModel {
  @prop({
    type: Types.ObjectId,
  })
  createdBy: Ref<User>;

  @prop({
    type: Types.ObjectId,
  })
  updatedBy: Ref<User>;

  @prop({
    type: Types.ObjectId,
  })
  deletedBy: Ref<User>;

  @prop({ default: false })
  isDeleted: boolean;

  @prop({ default: undefined })
  deletedAt?: Date;

  createdAt?: Date;
  updatedAt: Date;
}
