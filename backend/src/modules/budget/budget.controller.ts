import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Param,
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

@Controller('budget')
export class BudgetController {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly createExpenseUseCase: CreateExpenseUseCase,
  ) {}

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto);
  }

  @Get()
  findAll() {
    return this.budgetService.findAll();
  }

  @Get(':id')
  @UseGuards(BudgetExistsGuard)
  findOne(@GetBudget() budget: BudgetEntity) {
    return { success: true, data: budget };
  }

  @Patch(':id')
  @UseGuards(BudgetExistsGuard)
  update(
    @GetBudget() budget: BudgetEntity,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return this.budgetService.update(budget.id, updateBudgetDto);
  }

  @Delete(':id')
  @UseGuards(BudgetExistsGuard)
  remove(@GetBudget() budget: BudgetEntity) {
    return this.budgetService.remove(budget.id);
  }

  // expenses

  @Post(':id/expenses')
  @UseGuards(BudgetExistsGuard)
  createExpense(
    @GetBudget() budget: BudgetEntity,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.createExpenseUseCase.execute(budget.id, createExpenseDto);
  }

  @Get(':id/expenses/:expenseId')
  @UseGuards(BudgetExistsGuard, ExpenseExistsGuard)
  findExpense(@GetExpense() expense: ExpenseEntity) {
    return expense;
  }

  @Patch(':id/expenses/:expenseId')
  updateExpense(
    @GetBudget() budget: BudgetEntity,
    @Param('expenseId') expenseId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    // return this.budgetService.updateExpense(budget.id, expenseId, updateExpenseDto);
  }

  @Delete(':id/expenses/:expenseId')
  removeExpense(
    @GetBudget() budget: BudgetEntity,
    @Param('expenseId') expenseId: string,
  ) {
    // return this.budgetService.removeExpense(budget.id, expenseId);
  }
}
