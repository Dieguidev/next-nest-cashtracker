import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBudgetDto } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entities/budget.entity';

type CreateBudgetResult =
  | { success: true; data: BudgetEntity }
  | { success: false; error: string };

@Injectable()
export class CreateBudgetUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createBudgetDto: CreateBudgetDto): Promise<CreateBudgetResult> {
    try {
      const budget = await this.prisma.budget.create({
        data: createBudgetDto,
      });
      return { success: true, data: budget };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Database error');
    }
  }
}
