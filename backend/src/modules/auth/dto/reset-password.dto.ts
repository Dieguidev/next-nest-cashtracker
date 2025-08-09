import { IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  newPassword: string;

  // @IsString()
  // @MinLength(6)
  // @MaxLength(6)
  // token: string;
}
