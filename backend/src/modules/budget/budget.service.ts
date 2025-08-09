import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { CreateBudgetUseCase } from './use-cases/create-budget.use-case';
import { GetAllBudgetUseCase } from './use-cases/get-all-budget.use-case';

import { UpdateBudgetByIdUseCase } from './use-cases/update-budget-by-id.use-case';
import { DeleteBudgetByIdUseCase } from './use-cases/delete-budget-by-id.use-case';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class BudgetService {
  constructor(
    private readonly createBudgetUseCase: CreateBudgetUseCase,
    private readonly getAllBudgetUseCase: GetAllBudgetUseCase,
    private readonly updateBudgetByIdUseCase: UpdateBudgetByIdUseCase,
    private readonly deleteBudgetByIdUseCase: DeleteBudgetByIdUseCase,
  ) {}
  create(createBudgetDto: CreateBudgetDto, userId: string) {
    return this.createBudgetUseCase.execute(createBudgetDto, userId);
  }

  findAll(userId: User['id']) {
    return this.getAllBudgetUseCase.execute(userId);
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto) {
    return this.updateBudgetByIdUseCase.execute(id, updateBudgetDto);
  }

  async remove(id: string) {
    return this.deleteBudgetByIdUseCase.execute(id);
  }
}
