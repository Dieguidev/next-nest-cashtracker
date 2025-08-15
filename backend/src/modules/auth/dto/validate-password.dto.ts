import { IsString, MaxLength, MinLength } from 'class-validator';

export class ValidatePasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
