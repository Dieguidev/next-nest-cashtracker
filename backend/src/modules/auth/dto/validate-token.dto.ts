import { IsString, MaxLength, MinLength } from 'class-validator';

export class ValidateTokenDto {
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  token: string;
}
