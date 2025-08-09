import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/modules/auth/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetAllBudgetUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: User['id']) {
    try {
      const budgets = await this.prisma.budget.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return { success: true, data: budgets };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Database error');
    }
  }
}
