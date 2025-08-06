export class BudgetEntity {
  id: string;
  name: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;

  static fromPrisma(data: Record<string, any>): BudgetEntity {
    const budget = new BudgetEntity();
    budget.id = data.id;
    budget.name = data.name;
    budget.amount = data.amount;
    budget.createdAt = data.createdAt;
    budget.updatedAt = data.updatedAt;
    return budget;
  }
}
