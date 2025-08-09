import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
