import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginRequest, RegisterRequest } from './user.pd';

export class RegisterRequestDto implements RegisterRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly mobile: string;

  @IsString()
  @MinLength(8)
  public readonly repassword: string;

  @IsString()
  @MinLength(1)
  public readonly userName: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  [key: string]: string;
}

export class LoginRequestDto implements LoginRequest {
  [key: string]: string;

  @IsString()
  code?: string;

  @IsString()
  public readonly mobile: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;
}