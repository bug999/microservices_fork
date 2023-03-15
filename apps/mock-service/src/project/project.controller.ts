import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MockProjectService } from './project.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProject, Mock_Service } from './project.pd';
import { JsonData } from 'apps/common/utils/jsonData';
import {
  CreateProjectDto,
  CreateProjectTeamsDto,
  CreateTeamsOfMockDataDto,
  GetMockDataListDto,
  GetProjectListDto,
  UpdateProjectDto,
} from './project.dto';

@Controller()
export class MockProjectController {
  constructor(private readonly mockService: MockProjectService) {}
  /**
   * @description 创建项目
   * @param body
   * @returns
   */
  @Post('project/create')
  @GrpcMethod(Mock_Service, 'createProject')
  async createProject(@Body() body: CreateProjectDto) {
    try {
      console.log(22, body);
      await this.mockService.create(
        JSON.parse(body.user),
        JSON.parse(body.body),
      );
      return JsonData.buildSuccess();
    } catch (error) {
      return JsonData.buildError(error);
    }
  }

  /**
   * @description 创建项目下的组
   * @param body
   * @returns
   */
  @Post('project/teams/create')
  @GrpcMethod(Mock_Service, 'createTeamsOfProject')
  async createTeamsOfProject(@Body() query: CreateProjectTeamsDto) {
    try {
      console.log(22, query);
      await this.mockService.createTeamsOfProject(query);
      return JsonData.buildSuccess();
    } catch (error) {
      return JsonData.buildError(error);
    }
  }

  /**
   * @description 获取用户创建的项目
   * @param body
   * @returns
   */
  @Post('project/list')
  @GrpcMethod(Mock_Service, 'getProjectListByUserId')
  async getListByUserId(@Body() body: GetProjectListDto) {
    try {
      const list = await this.mockService.getListByUserId(body);
      return JsonData.buildSuccess(list);
    } catch (error) {
      return JsonData.buildError(error);
    }
  }

  /**
   * @description 更新项目
   * @param body
   * @returns
   */
  @Post('project/edit')
  @GrpcMethod(Mock_Service, 'updateProjectById')
  async updateProjectById(@Body() body: UpdateProjectDto) {
    console.log(111, body);
    try {
      await this.mockService.updateProjectById(body);
      return JsonData.buildSuccess();
    } catch (error) {
      return JsonData.buildError(error);
    }
  }

  /**
   * @description 新增mock数据
   * @param body
   * @returns
   */
  @Post('project/teams/create_data')
  @GrpcMethod(Mock_Service, 'createTeamsOfMockData')
  async createTeamsOfMockData(@Body() body: CreateTeamsOfMockDataDto) {
    console.log(111, body);
    try {
      await this.mockService.createTeamsOfMockData(body);
      return JsonData.buildSuccess();
    } catch (error) {
      return JsonData.buildError(error);
    }
  }

  /**
   * @description 获取teams下的mock数据列表
   * @param body
   * @returns
   */
  @Post('project/list')
  @GrpcMethod(Mock_Service, 'getMockDataListByTeamsId')
  async getMockDataListByTeamsId(@Body() body: GetMockDataListDto) {
    try {
      console.log(99, body);
      const list = await this.mockService.getMockDataListByTeamsId(body);
      return JsonData.buildSuccess(list);
    } catch (error) {
      return JsonData.buildError(error);
    }
  }
}
