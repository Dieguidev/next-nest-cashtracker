import { getBudgetByIdAction } from "@/actions";
import { AddExpenseButton, ExpenseMenu, ModalContainer } from "@/components";
import { formatCurrency, formatDate } from "@/utils";
import { notFound } from "next/navigation";

interface BudgetDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BudgetDetailsPageProps) {
  const { id } = await params;

  const { budget } = await getBudgetByIdAction(id);
  if (!budget) {
    return {
      title: "Presupuesto no encontrado",
    };
  }

  return {
    title: `${budget.name}`,
    description: `Edita el presupuesto ${budget.name} con los detalles actuales.`,
  };
}

export default async function BudgetDetailsPage({
  params,
}: BudgetDetailsPageProps) {
  const { id } = await params;

  const { budget } = await getBudgetByIdAction(id);
  if (!budget) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
          <p className="text-xl font-bold">
            Administra tus {""} <span className="text-amber-500">gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>
      {budget.expenses.length ? (
        <>
          <h1 className="font-black text-4xl text-purple-950 mt-10">
            Gastos en este presupuesto
          </h1>

          <ul
            role="list"
            className="divide-y divide-gray-300  shadow-lg mt-10 "
          >
            {budget.expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {expense.name}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatCurrency(expense.amount)}
                    </p>
                    <p className="text-gray-500  text-sm">
                      Agregado: {}
                      <span className="font-bold">
                        {formatDate(expense.createdAt)}
                      </span>
                    </p>
                  </div>
                </div>
                <ExpenseMenu expenseId={expense.id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center py-20">
          No hay gastos registrados en este presupuesto.
        </p>
      )}

      <ModalContainer budgetId={id} />
    </>
  );
}
