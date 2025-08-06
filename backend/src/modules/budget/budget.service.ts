import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { CreateBudgetUseCase } from './use-cases/create-budget.use-case';

@Injectable()
export class BudgetService {
  constructor(private readonly createBudgetUseCase: CreateBudgetUseCase) {}
  create(createBudgetDto: CreateBudgetDto) {
    return this.createBudgetUseCase.execute(createBudgetDto);
  }

  findAll() {
    return `This action returns all budget`;
  }

  findOne(id: number) {
    return `This action returns a #${id} budget`;
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    return `This action updates a #${id} budget`;
  }

  remove(id: number) {
    return `This action removes a #${id} budget`;
  }
}
