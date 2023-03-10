
import db from "config/db";
import { join } from "path";
import { DataSource } from "typeorm";
import { User } from "../entity/user";

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
  entities: [User]
});
dataSource.initialize().then(() => {
  console.log('数据库连接成功');
}); // 执行连接
export default dataSource;