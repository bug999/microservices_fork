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

export class CreateProjectTeamsDto {
  @IsNumber()
  userId?: number;
  @IsString()
  name?: string;
  @IsString()
  desc?: string;
  @IsString()
  resData?: string;
  @IsNumber()
  status?: number;
}

export class GetProjectListDto implements PageQueryType {
  page: number;
  pageSize: number;
  userId: number;
  name?: string;
}
export class GetMockDataListDto implements PageQueryType {
  page: number;
  pageSize: number;
  teamsId: number;
  name?: string;
}

export class UpdateProjectDto extends CreateProjectDto {
  id: number;
  body: string;
  user: any;
  name?: string;
  desc?: string;
  status?: number;
}

export class CreateTeamsOfMockDataDto {
  name?: string;
  desc?: string;
  status?: number;
  teamsId?: number;
  mark: string;
  userId: string;
  resData: string;
}
