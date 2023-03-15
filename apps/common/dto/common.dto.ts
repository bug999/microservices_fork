import { IsString } from "class-validator";
export class UserInfoDto {
  @IsString()
  user?: string
}

export class PostRequestDataDto extends UserInfoDto {
  @IsString()
  body?: string
}

