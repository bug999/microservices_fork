/* eslint-disable */
import { ResponseData } from 'apps/common/utils/jsonData';
import {
  CreateProjectDto,
  CreateProjectTeamsDto,
  GetProjectListDto,
  UpdateProjectDto,
  CreateTeamsOfMockDataDto,
  GetMockDataListDto,
} from 'apps/mock-service/src/project/project.dto';
import { Observable } from 'rxjs';
import { GatewayArgs } from '../common.pb';

export const protobufPackage = 'mock';

export const PACKAGE_NAME = 'mock';

export interface MockServiceClient {
  createProject(request: CreateProjectDto): Observable<ResponseData>;
  getProjectListByUserId(
    request: GatewayArgs<GetProjectListDto>,
  ): Observable<ResponseData>;
  updateProjectById(
    request: GatewayArgs<UpdateProjectDto>,
  ): Observable<ResponseData>;
  createTeamsOfProject(
    request: GatewayArgs<CreateProjectTeamsDto>,
  ): Observable<ResponseData>;
  createTeamsOfMockData(
    request: GatewayArgs<CreateTeamsOfMockDataDto>,
  ): Observable<ResponseData>;
  getMockDataListByTeamsId(
    request: GatewayArgs<GetMockDataListDto>,
  ): Observable<ResponseData>;
}

export interface MockServiceController extends MockServiceClient {}

export const SERVICE_NAME = 'MockService';
