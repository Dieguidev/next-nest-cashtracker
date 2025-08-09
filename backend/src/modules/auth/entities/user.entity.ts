import { Budget } from 'src/modules/budget/interfaces/budget.interface';

export class User {
  id: string;
  name: string;
  password?: string | null;
  email: string;
  token: string;
  confirmed: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  budgets: Budget[];
}
