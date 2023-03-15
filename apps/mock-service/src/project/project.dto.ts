import { PostRequestDataDto } from 'apps/common/dto/common.dto';
import { PageQueryType, PageType } from 'apps/common/utils/pageUtils';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { CreateProject } from './project.pd';

export class EditProjectDto implements CreateProjectDto {
  body: string;
  user: any;
  @IsString()
  name?: string;
  @IsString()
  desc?: string;
  @IsNumber()
  status?: number;
}

export class CreateProjectDto implements CreateProject, PostRequestDataDto {
  [key: string]: any;
  body: string;
  user: any;
  @IsString()
  name?: string;
  @IsString()
  desc?: string;
  @IsNumber()
  status?: number;
}

export class GetProjectListDto implements PageQueryType {
  page: number;
  pageSize: number;
  userId: number;
  name?: string
}

export class UpdateProjectDto extends CreateProjectDto {
  id: number;
  body: string;
  user: any;
  name?: string;
  desc?: string;
  status?: number;
}