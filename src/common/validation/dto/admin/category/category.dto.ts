import { Type } from "class-transformer";
import { IsIn, IsInt, IsMongoId, IsNotEmptyObject, IsOptional, IsPositive } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups.dto";
import { PagingDto } from "../../paging.dto"
import { TranslationDto } from "../../translation.dto";

export class CategoryDtoGroups extends DtoGroups { }

export class CategoryGetDto extends PagingDto { }

export class CategoryDto extends BaseDto {
    @IsNotEmptyObject({ nullable: false }, { groups: [CategoryDtoGroups.CREATE, CategoryDtoGroups.UPDATE] })
    @Type(() => TranslationDto)
    name: TranslationDto;

    @IsOptional({
        groups: [CategoryDtoGroups.CREATE, CategoryDtoGroups.UPDATE]
    })
    @IsMongoId({ groups: [CategoryDtoGroups.CREATE, CategoryDtoGroups.UPDATE, CategoryDtoGroups.POSITION] })
    parentId: string;

    @IsInt()
    step: number;

    @IsPositive({ groups: [CategoryDtoGroups.POSITION] })
    @IsInt({ groups: [CategoryDtoGroups.POSITION] })
    position: number;
}