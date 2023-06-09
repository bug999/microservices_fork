import db from 'config/db';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { MockData } from '../entity/mockData.entity';
import { MockProject } from '../entity/project.entity';
import { MockUserAndProjetOfRelation } from '../entity/project_user.entity';
import { MockTeams } from '../entity/teams.entity';

const dataSource = new DataSource({
  type: 'mysql',
  // 自定义主机; 默认值: localhost
  host: db.mysql.host, // 数据库地址
  // 自定义端口; 默认值: 3306
  port: db.mysql.port,
  username: db.mysql.user,
  password: db.mysql.password,
  database: db.mysql.database,
  // entities: [join(__dirname + "/entity/*{.js,.ts}")],
  synchronize: true,
  entities: [MockProject, MockTeams, MockUserAndProjetOfRelation, MockData],
});
dataSource.initialize().then(() => {
  console.log('mock:数据库连接成功');
}); // 执行连接
export default dataSource;
