import { IsOptional, IsMongoId, IsBoolean, IsString, ValidateIf } from 'class-validator';
import { BaseDto, DtoGroups } from '../../../dtoGroups.dto';
import { PagingDto } from '../../paging.dto';

export class RoleDtoGroup extends DtoGroups { }

export class RoleGetDto extends PagingDto { }

export class RoleDto extends BaseDto{
  @IsString({
    groups: [RoleDtoGroup.UPDATE, RoleDtoGroup.CREATE],
  })
  name: string; 

  //course 
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  course: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  courseCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  courseUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  courseDelete: boolean;

  /** *********************************************** */

  //category
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  category: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  categoryCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  categoryUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  categoryDelete: boolean;


  /** ******************************* */


  //order
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  order: boolean;

  //   @IsBoolean({
  //     groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  //   })
  //   @IsOptional({
  //     groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  //   })
  //   orderCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  orderUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  orderDelete: boolean;


  /** ******************************* */

  //----------------------- USERS ------------------------
  // students
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  student: boolean;

  //   @IsBoolean({
  //     groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  //   })
  //   @IsOptional({
  //     groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  //   })
  //   studentCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  studentUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  studentDelete: boolean;


  // teachers
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  teacher: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  teacherCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  teacherUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  teacherDelete: boolean;

  /** ******************************* */

  //role
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  role: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  roleDelete: boolean;

  /** ******************************* */

  //employee
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employee: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  employeeDelete: boolean;

  /** ******************************* */


  //discount
  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  discount: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  discountCreate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  discountUpdate: boolean;

  @IsBoolean({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  @IsOptional({
    groups: [RoleDtoGroup.CREATE, RoleDtoGroup.UPDATE]
  })
  discountDelete: boolean;

}
