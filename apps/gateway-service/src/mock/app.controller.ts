import { Body, Controller, Get, Inject, OnModuleInit, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { JsonData, ResponseData } from 'apps/common/utils/jsonData';
import { CreateProjectDto, GetProjectListDto } from 'apps/mock-service/src/project/project.dto';
import { CreateProject } from 'apps/mock-service/src/project/project.pd';
import { AuthService } from '../auth/auth.service';
import { GatewayArgs } from '../common.pb';
import { MockServiceClient, SERVICE_NAME } from './app.pb';

@Controller('mock')
export class MockController implements OnModuleInit {
  constructor(private readonly authService: AuthService) { }
  private svc: MockServiceClient;

  @Inject(SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<MockServiceClient>(SERVICE_NAME);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('project/create')
  async create(@Request() req: CreateProjectDto) {
    console.log(req.body)
    const data = await this.svc.createProject({ ...req, user: JSON.stringify(req.user), body: JSON.stringify(req.body) }).toPromise()
    return data
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('project/list')
  async getProjectListByUserId(@Request() req: GatewayArgs<GetProjectListDto>) {
    const data = await this.svc.getProjectListByUserId({ ...req.query, userId: req.user.userId }).toPromise()
    return JsonData.parse(data)
  }
}