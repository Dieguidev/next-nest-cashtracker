import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { CreateBudgetUseCase } from './use-cases/create-budget.use-case';
import { GetAllBudgetUseCase } from './use-cases/get-all-budget.use-case';
import { GetBudgetByIdUseCase } from './use-cases/get-budget-by-id.use-case';
import { UpdateBudgetByIdUseCase } from './use-cases/update-budget-by-id.use-case';
import { DeleteBudgetByIdUseCase } from './use-cases/delete-budget-by-id.use-case';

@Injectable()
export class BudgetService {
  constructor(
    private readonly createBudgetUseCase: CreateBudgetUseCase,
    private readonly getAllBudgetUseCase: GetAllBudgetUseCase,
    private readonly getBudgetByIdUseCase: GetBudgetByIdUseCase,
    private readonly updateBudgetByIdUseCase: UpdateBudgetByIdUseCase,
    private readonly deleteBudgetByIdUseCase: DeleteBudgetByIdUseCase,
  ) {}
  create(createBudgetDto: CreateBudgetDto) {
    return this.createBudgetUseCase.execute(createBudgetDto);
  }

  findAll() {
    return this.getAllBudgetUseCase.execute();
  }

  findOne(id: string) {
    return this.getBudgetByIdUseCase.execute(id);
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto) {
    await this.getBudgetByIdUseCase.execute(id);
    return this.updateBudgetByIdUseCase.execute(id, updateBudgetDto);
  }

  async remove(id: string) {
    await this.getBudgetByIdUseCase.execute(id);
    return this.deleteBudgetByIdUseCase.execute(id);
  }
}
