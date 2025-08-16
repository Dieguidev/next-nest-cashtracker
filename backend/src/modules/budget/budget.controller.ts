import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { BudgetExistsGuard } from './guards/budget-exists.guard';
import { GetBudget } from './decorators/get-budget.decorator';
import { BudgetEntity } from './entities/budget.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseExistsGuard } from './guards/expense-exsits.guard';
import { CreateExpenseUseCase } from './use-cases/create-expense.use-case';
import { GetExpense } from './decorators/get-expense.decorator';
import { ExpenseEntity } from './entities/expense.entity';
import { UpdateExpenseUseCase } from './use-cases/update-expense.use-case';
import { DeleteExpenseUseCase } from './use-cases/delete-expense.use-case';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('budget')
export class BudgetController {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    private readonly updateExpenseUseCase: UpdateExpenseUseCase,
    private readonly deleteExpenseUseCase: DeleteExpenseUseCase,
  ) {}

  @Post()
  @Auth()
  create(@Body() createBudgetDto: CreateBudgetDto, @GetUser() user: User) {
    return this.budgetService.create(createBudgetDto, user.id);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.budgetService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(BudgetExistsGuard)
  @Auth()
  findOne(@GetBudget() budget: BudgetEntity) {
    return { success: true, data: budget };
  }

  @Patch(':id')
  @UseGuards(BudgetExistsGuard)
  @Auth()
  update(
    @GetBudget() budget: BudgetEntity,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return this.budgetService.update(budget.id, updateBudgetDto);
  }

  @Delete(':id')
  @UseGuards(BudgetExistsGuard)
  @Auth()
  remove(@GetBudget() budget: BudgetEntity) {
    return this.budgetService.remove(budget.id);
  }

  // expenses

  @Post(':id/expenses')
  @UseGuards(BudgetExistsGuard)
  @Auth()
  createExpense(
    @GetBudget() budget: BudgetEntity,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.createExpenseUseCase.execute(budget.id, createExpenseDto);
  }

  @Get(':id/expenses/:expenseId')
  @UseGuards(BudgetExistsGuard, ExpenseExistsGuard)
  @Auth()
  findExpense(@GetExpense() expense: ExpenseEntity) {
    return expense;
  }

  @Patch(':id/expenses/:expenseId')
  @UseGuards(BudgetExistsGuard, ExpenseExistsGuard)
  @Auth()
  updateExpense(
    @GetExpense() expense: ExpenseEntity,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.updateExpenseUseCase.execute(expense.id, updateExpenseDto);
  }

  @Delete(':id/expenses/:expenseId')
  @UseGuards(BudgetExistsGuard, ExpenseExistsGuard)
  @Auth()
  removeExpense(@GetExpense() expense: ExpenseEntity) {
    return this.deleteExpenseUseCase.execute(expense.id);
  }
}
