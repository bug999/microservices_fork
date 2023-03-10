import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginRequest, RegisterRequest } from '../pd/user.pd';

export class LoginRequestDto implements LoginRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(20)
  public readonly password: string;
}