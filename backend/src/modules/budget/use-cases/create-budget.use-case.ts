import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBudgetDto } from '../dto/create-budget.dto';

@Injectable()
export class CreateBudgetUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createBudgetDto: CreateBudgetDto, userId: string) {
    try {
      const budget = await this.prisma.budget.create({
        data: {
          ...createBudgetDto,
          userId,
        },
      });
      return { success: true, data: budget };
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Database error');
    }
  }
}
