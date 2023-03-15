import { PostRequestDataDto } from "apps/common/dto/common.dto";
import { UserDataType } from "apps/common/pd/common.pd";
import { ResponseData } from "apps/common/utils/jsonData";


export interface CreateProject {
  name: string;
  desc: string;
  status?: number;
  [key: string]: any;
}

export interface EditProject extends CreateProject, PostRequestDataDto {
  id: string
}

export const Mock_Service = 'MockService'