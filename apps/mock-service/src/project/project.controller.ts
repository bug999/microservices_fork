import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { MockProjectService } from './project.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProject, Mock_Service } from './project.pd';
import { JsonData } from 'apps/common/utils/jsonData';
import { CreateProjectDto, GetProjectListDto, UpdateProjectDto } from './project.dto';

@Controller()
export class MockProjectController {
  constructor(private readonly mockService: MockProjectService) { }
  /**
   * @description 创建项目
   * @param body 
   * @returns 
   */
  @Post('project/create')
  @GrpcMethod(Mock_Service, 'createProject')
  async createProject(@Body() body: CreateProjectDto) {
    try {
      console.log(22, body)
      await this.mockService.create(JSON.parse(body.user), JSON.parse(body.body))
      return JsonData.buildSuccess()
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
  async getListByUserId(@Body() body: GetProjectListDto,) {
    try {
      const list = await this.mockService.getListByUserId(body)
      return JsonData.buildSuccess(list)
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
    console.log(111, body)
    try {
      await this.mockService.updateProjectById(body)
      return JsonData.buildSuccess()
    } catch (error) {
      return JsonData.buildError(error);
    }
  }
}
