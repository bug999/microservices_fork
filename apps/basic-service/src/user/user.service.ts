import { Injectable } from '@nestjs/common';
import dataSource from 'apps/basic-service/src/database/connection';
import { makeSalt, encryptPassword } from '../utils/cryptogram'; // 引入加密函数
import { LoginRequestDto, RegisterRequestDto } from './user.dto';
import { User } from '../entity/user.entity';
import { JsonData } from 'apps/common/utils/jsonData';
import { AuthService } from '../auth/auth.service';

const userRepository = dataSource.getRepository(User);
@Injectable()
export class UserService {
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
   * 登陆
   * @param requestBody 请求体
   */
  async login(requestBody: LoginRequestDto): Promise<any> {
    const { code, mobile } = requestBody;
    const user = await userRepository.findOne({
      where: {
        mobile: mobile
      }
    })
    if (user) {
      const hashPwd = encryptPassword(requestBody.password, user.salt);  // 加密密码
      if (hashPwd === user.password) {
        const { password, salt, ...userData } = user
        return userData
      }
    }
    return null;
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
    return {
      code: 200,
      msg: '注册成功',
    };
  }
}
