import { PostRequestDataDto } from 'apps/common/dto/common.dto';
import { PageQueryType, PageType } from 'apps/common/utils/pageUtils';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { CreateProject, EditProject } from './project.pd';

export class EditProjectDto implements CreateProjectDto {
  body: string;
  user: any;
  @IsString()
  name: string;
  @IsString()
  desc: string;
  @IsNumber()
  status?: number;
  [key: string]: any;
}

export class CreateProjectDto implements CreateProject, PostRequestDataDto {
  body: string;
  user: any;
  @IsString()
  name: string;
  @IsString()
  desc: string;
  @IsNumber()
  status?: number;
  [key: string]: any;
}

export class GetProjectListDto implements PageQueryType {
  page: number;
  pageSize: number;
  userId: number;
  name?: string
}