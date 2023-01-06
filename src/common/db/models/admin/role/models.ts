import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { CollectionNames } from '../../../../constants/collections';
import { BaseModel } from '../../base.model';

@modelOptions({
  schemaOptions: {
    collection: CollectionNames.ROLE,
  },
})

@index(
  {
    name: 1,
  },
  {
    unique: true,
    background: true,
    name: 'rolename',
  },
)

@index(
  {
    isDeleted: 1,
  },
  {
    background: true,
    name: 'deleted',
  },
)
export class Role extends BaseModel {
  @prop({
    trim: true,
    required: true,
  })
  name: string;

  /** *********************************************** */

  //course
  @prop({
    default: false
  })
  course: boolean;

  @prop({
    default: false
  })
  courseCreate: boolean;

  @prop({
    default: false
  })
  courseUpdate: boolean;

  @prop({
    default: false
  })
  courseDelete: boolean;

  /** ******************************* */

  //category
  @prop({
    default: false
  })
  category: boolean;

  @prop({
    default: false
  })
  categoryCreate: boolean;

  @prop({
    default: false
  })
  categoryUpdate: boolean;

  @prop({
    default: false
  })
  categoryDelete: boolean;


  /** ******************************* */


  //order
  @prop({
    default: false
  })
  order: boolean;


  @prop({
    default: false
  })
  orderUpdate: boolean;

  @prop({
    default: false
  })
  orderDelete: boolean;


  /** ******************************* */

  // ---  users ----

  //teacher
  @prop({
    default: false
  })
  teacher: boolean;

  @prop({
    default: false
  })
  teacherCreate: boolean;

  @prop({
    default: false
  })
  teacherUpdate: boolean;

  @prop({
    default: false
  })
  teacherDelete: boolean;

  // --------------------------------------------

  //student
  @prop({
    default: false
  })
  student: boolean;


  @prop({
    default: false
  })
  studentUpdate: boolean;

  @prop({
    default: false
  })
  studentDelete: boolean;
  /** ******************************* */


  //role
  @prop({
    default: false
  })
  role: boolean;

  @prop({
    default: false
  })
  roleCreate: boolean;

  @prop({
    default: false
  })
  roleUpdate: boolean;

  @prop({
    default: false
  })
  roleDelete: boolean;

  /** ******************************* */

  //employee
  @prop({
    default: false
  })
  employee: boolean;

  @prop({
    default: false
  })
  employeeCreate: boolean;

  @prop({
    default: false
  })
  employeeUpdate: boolean;

  @prop({
    default: false
  })
  employeeDelete: boolean;

  /** ******************************* */


  //discount
  @prop({
    default: false
  })
  discount: boolean;

  @prop({
    default: false
  })
  discountCreate: boolean;

  @prop({
    default: false
  })
  discountUpdate: boolean;

  @prop({
    default: false
  })
  discountDelete: boolean;

}

export const RoleModel = getModelForClass(Role);