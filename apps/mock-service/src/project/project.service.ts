import { Injectable } from '@nestjs/common';
import { Pagination } from 'apps/common/utils/pageUtils';
import dataSource from '../database/connection';
import { MockData } from '../entity/mockData.entity';
import { MockProject } from '../entity/project.entity';
import { MockUserAndProjetOfRelation } from '../entity/project_user.entity';
import { MockTeams } from '../entity/teams.entity';
import {
  CreateProjectTeamsDto,
  CreateTeamsOfMockDataDto,
  GetMockDataListDto,
  GetProjectListDto,
  UpdateProjectDto,
} from './project.dto';
import { CreateProject } from './project.pd';

@Injectable()
export class MockProjectService {
  repository = dataSource.getRepository(MockProject);
  mockDataRepository = dataSource.getRepository(MockData);
  /**
   * 创建
   * @param requestBody 请求体
   */
  async create(user: any, requestBody: CreateProject): Promise<any> {
    console.log({
      createrId: user.userId,
      ...requestBody,
    });
    const res = await this.repository
      .createQueryBuilder()
      .insert()
      .into(MockProject)
      .values({
        createrId: user.userId,
        ...requestBody,
      })
      .execute();
    console.log(111, res);
    // 插入中间表
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(MockUserAndProjetOfRelation)
      .values({
        userId: user.userId,
        projectId: res.identifiers[0].id,
      })
      .execute();
    return res;
  }
  async createTeamsOfProject(query: CreateProjectTeamsDto): Promise<any> {
    console.log(444, {
      ...query,
    });

    // 插入组数据
    const res = await this.repository
      .createQueryBuilder()
      .insert()
      .into(MockTeams)
      .values({
        ...query,
        createrId: query.userId,
      })
      .execute();

    return res;
  }
  /**
   * 获取列表
   * @param requestBody 请求体
   */
  async getListByUserId(query: GetProjectListDto): Promise<any> {
    const res: [any, any] = await this.repository
      .createQueryBuilder('project_list') //别名.where("rule.evaluation_standard LIKE :evaluation_standard", { evaluation_standard: `%${keyword}%` })// 模糊查询条件
      .orderBy('project_list.updated_at', 'ASC') //排序
      .skip((query.page - 1) * query.pageSize) // 跳过的数据条数，即当前页数减一乘每页的数据条数
      .take(query.pageSize) // 每页的数据条数
      .getManyAndCount(); // 返回查询到的数据和总条数
    return new Pagination(query.page, query.pageSize, res[0], res[1]);
  }

  /**
   * 获取列表
   * @param requestBody 请求体
   */
  async getMockDataListByTeamsId(query: GetMockDataListDto): Promise<any> {
    console.log(99, query.teamsId);
    const res: [any, any] = await this.mockDataRepository
      .createQueryBuilder('mockdata') //别名.where("rule.evaluation_standard LIKE :evaluation_standard", { evaluation_standard: `%${keyword}%` })// 模糊查询条件
      .where({ teamsId: query.teamsId })
      .orderBy('mockdata.updated_at', 'ASC') //排序
      .skip((query.page - 1) * query.pageSize) // 跳过的数据条数，即当前页数减一乘每页的数据条数
      .take(query.pageSize) // 每页的数据条数
      .getManyAndCount(); // 返回查询到的数据和总条数
    return new Pagination(query.page, query.pageSize, res[0], res[1]);
  }

  async updateProjectById(query: UpdateProjectDto): Promise<any> {
    const res = await this.repository.update(query.id, query);
    console.log(res);
    return res;
  }

  async createTeamsOfMockData(query: CreateTeamsOfMockDataDto): Promise<any> {
    // 插入组数据
    const res = await this.mockDataRepository
      .createQueryBuilder()
      .insert()
      .into(MockData)
      .values({
        ...query,
        createrId: query.userId as unknown as number,
      })
      .execute();
    return res;
  }
}
