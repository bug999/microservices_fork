import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../../../common/database/sequelize'; // 引入 Sequelize 实例
import { makeSalt, encryptPassword } from '../../utils/cryptogram'; // 引入加密函数
import { User } from '../entity/user.entity';
import { RegisterRequest } from '../pd/user.pd';

@Injectable()
export class UserService {
  login(): string {
    return 'Hello World!';
  }
  /**
  * 查询是否有该用户
  * @param username 用户名
  */
  async findOne(email?: string, mobile?: string): Promise<any | undefined> {
    const sql = `
      SELECT
        *
      FROM
        user
      WHERE
      email = '${email || ""}' or mobile ='${mobile || ''}';
    `; // 一段平淡无奇的 SQL 查询语句
    try {
      const user = (await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        // logging: true, // 是否将 SQL 语句打印到控制台
      }))[0];
      // 若查不到用户，则 user === undefined
      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  /**
 * 注册
 * @param requestBody 请求体
 */
  async register(requestBody: RegisterRequest): Promise<any> {
    const { userName, password, repassword, mobile, email } = requestBody;
    console.log(password, repassword, mobile)
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(email, mobile);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt);  // 加密密码
    const registerSQL = `
        INSERT INTO user
          (user_name, password, mobile, status, email, salt)
        VALUES
          ('${userName || ''}', '${hashPwd}', '${mobile}', 1, '${email || ''}','${salt}')
      `;
    try {
      await sequelize.query(registerSQL, { logging: true });
      return {
        code: 200,
        msg: 'success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
