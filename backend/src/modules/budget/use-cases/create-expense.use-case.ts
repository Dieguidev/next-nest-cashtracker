import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { ExpenseEntity } from '../entities/expense.entity';

@Injectable()
export class CreateExpenseUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    budgetId: string,
    createExpenseDto: CreateExpenseDto,
  ): Promise<ExpenseEntity> {
    try {
      const expense = await this.prisma.expense.create({
        data: {
          ...createExpenseDto,
          budgetId,
        },
      });
      return expense;
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Database error');
    }
  }
}
