
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email?: string;
  password: string;
  moblie: string;
  [key: string]: string;
}

export const Basic_Service = 'BasicService'