import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsEmail()
  @MinLength(1)
  @MaxLength(100)
  email: string;
}
