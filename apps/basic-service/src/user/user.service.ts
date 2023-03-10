import { Injectable } from '@nestjs/common';
import dataSource from 'apps/basic-service/src/database/connection';
import sequelize from '../database/sequelize'; // 引入 Sequelize 实例
import { makeSalt, encryptPassword } from '../utils/cryptogram'; // 引入加密函数
import { RegisterRequestDto } from './user.dto';
import { User } from '../entity/user';
import { RegisterRequest } from './user.pd';

const userRepository = dataSource.getRepository(User);
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
    return await userRepository.findOne({
      where: {
        mobile: mobile,
      }
    })
  }

  /**
 * 注册
 * @param requestBody 请求体
 */
  async register(requestBody: RegisterRequestDto): Promise<any> {
    const { userName, password, repassword, mobile, email } = requestBody;
    console.log(password, repassword, mobile)
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(email, mobile);
    console.log(111, mobile, user)
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt);  // 加密密码
    userRepository.createQueryBuilder().insert().into(User).values({
      mobile,
      email: email,
      password: hashPwd,
      userName,
      salt
    }).execute()
    // const registerSQL = `
    //     INSERT INTO user
    //       (user_name, password, mobile, status, email, salt)
    //     VALUES
    //       ('${userName || ''}', '${hashPwd}', '${mobile}', 1, '${email || ''}','${salt}')
    //   `;
    try {
      //   await sequelize.query(registerSQL, { logging: true });
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
