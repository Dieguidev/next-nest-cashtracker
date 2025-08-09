import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateBudgetUseCase } from './use-cases/create-budget.use-case';
import { GetAllBudgetUseCase } from './use-cases/get-all-budget.use-case';

import { UpdateBudgetByIdUseCase } from './use-cases/update-budget-by-id.use-case';
import { DeleteBudgetByIdUseCase } from './use-cases/delete-budget-by-id.use-case';
import { BudgetExistsGuard } from './guards/budget-exists.guard';
import { CreateExpenseUseCase } from './use-cases/create-expense.use-case';

@Module({
  controllers: [BudgetController],
  providers: [
    BudgetService,
    CreateBudgetUseCase,
    GetAllBudgetUseCase,
    UpdateBudgetByIdUseCase,
    DeleteBudgetByIdUseCase,
    BudgetExistsGuard,
    CreateExpenseUseCase,
  ],
  imports: [PrismaModule],
})
export class BudgetModule {}
