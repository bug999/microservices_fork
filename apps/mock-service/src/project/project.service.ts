import { Injectable } from '@nestjs/common';
import { Pagination } from 'apps/common/utils/pageUtils';
import dataSource from '../database/connection';
import { MockProject } from '../entity/project.entity';
import { GetProjectListDto } from './project.dto';
import { CreateProject } from './project.pd';

@Injectable()
export class MockProjectService {
  repository = dataSource.getRepository(MockProject);
  /**
   * 创建
   * @param requestBody 请求体
   */
  async create(user: any, requestBody: CreateProject): Promise<any> {
    console.log({
      createrId: user.userId,
      ...requestBody
    })
    const res = await this.repository.createQueryBuilder().insert().into(MockProject).values({
      createrId: user.userId,
      ...requestBody
    }).execute()
    console.log(res)
    return res
  }

  /**
 * 获取列表
 * @param requestBody 请求体
 */
  async getListByUserId(query: GetProjectListDto): Promise<any> {
    const res: [any, any] = await this.repository.createQueryBuilder('project_list')   //别名.where("rule.evaluation_standard LIKE :evaluation_standard", { evaluation_standard: `%${keyword}%` })// 模糊查询条件
      .orderBy('project_list.updated_at', 'ASC')   //排序
      .skip((query.page - 1) * query.pageSize)   // 跳过的数据条数，即当前页数减一乘每页的数据条数
      .take(query.pageSize)     // 每页的数据条数
      .getManyAndCount(); // 返回查询到的数据和总条数
    return new Pagination(query.page, query.pageSize, res[0], res[1])
  }
}
