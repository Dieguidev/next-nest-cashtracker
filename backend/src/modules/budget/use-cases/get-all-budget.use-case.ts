import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetAllBudgetUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    try {
      const budgets = await this.prisma.budget.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return { success: true, data: budgets };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Database error');
    }
  }
}
