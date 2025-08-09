import { IsString, MaxLength, MinLength } from 'class-validator';

export class ConfirmAccountDto {
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  token: string;
}
