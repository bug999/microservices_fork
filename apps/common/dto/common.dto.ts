import { IsString } from "class-validator";
export class UserInfoDto {
  @IsString()
  user: string
}