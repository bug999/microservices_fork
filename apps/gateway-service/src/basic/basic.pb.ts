/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { LoginRequestDto, RegisterRequestDto } from 'apps/basic-service/src/user/user.dto';
import { RegisterResponse } from 'apps/basic-service/src/user/user.pd';
import { UserInfoDto } from 'apps/common/dto/common.dto';
import { ResponseData } from 'apps/common/utils/jsonData';
import { Observable } from 'rxjs';

export const protobufPackage = 'basic';


export const BASIC_PACKAGE_NAME = 'basic';

export interface BasicServiceClient {
  register(request: RegisterRequestDto): Observable<RegisterResponse>;
  login(request: LoginRequestDto): Observable<RegisterResponse>;
  getUserInfo(request: UserInfoDto): Observable<ResponseData>
}

export interface BasicServiceController {
  register(request: RegisterRequestDto): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;
  login(request: LoginRequestDto): Observable<RegisterResponse>;
  getUserInfo(request: UserInfoDto): Observable<ResponseData>
}

export function BasicServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'login', 'getUserInfo'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('BASICService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('BASICService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BASIC_SERVICE_NAME = 'BasicService';
