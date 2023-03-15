/* eslint-disable */
import { ResponseData } from 'apps/common/utils/jsonData';
import { CreateProjectDto, GetProjectListDto } from 'apps/mock-service/src/project/project.dto';
import { Observable } from 'rxjs';
import { GatewayArgs } from '../common.pb';

export const protobufPackage = 'mock';


export const PACKAGE_NAME = 'mock';

export interface MockServiceClient {
  createProject(request: CreateProjectDto): Observable<ResponseData>;
  getProjectListByUserId(request: GatewayArgs<GetProjectListDto>): Observable<ResponseData>;
}

export interface MockServiceController {
  createProject(request: CreateProjectDto): Observable<ResponseData>;
  getProjectListByUserId(request: GatewayArgs<GetProjectListDto>): Observable<ResponseData>;
}

export const SERVICE_NAME = 'MockService';
