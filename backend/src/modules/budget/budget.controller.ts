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

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

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
}
