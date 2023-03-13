import { ResponseData } from "apps/common/dto/common.dto";

export interface LoginRequest {
  mobile: string;
  password: string;
  code?: string;
  [key: string]: string;
}

export interface RegisterRequest {
  email?: string;
  password: string;
  mobile: string;
  userName?: string;
  repassword?: string;
  [key: string]: string;
}

export interface RegisterResponse extends ResponseData {
  data: any
}

export const Basic_Service = 'BasicService'