import { Expense } from "./expense";

export interface Budget {
  id: string;
  name: string;
  amount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  expenses: Expense[];
}
