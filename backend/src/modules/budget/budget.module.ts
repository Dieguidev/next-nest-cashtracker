import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateBudgetUseCase } from './use-cases/create-budget.use-case';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService, CreateBudgetUseCase],
  imports: [PrismaModule],
})
export class BudgetModule {}
